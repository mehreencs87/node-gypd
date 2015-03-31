var es      = require('event-stream');
var request = require('request');
var config  = require('../config');
var path    = require('path');
var fstream = require('fstream');

var zlib = require('zlib');
// var tar  = require('tar');
var tar = require('tar-fs');

var fs = require('fs');

var _  = require('lodash');

var url_template = _.template('https://registry.npmjs.org/${package}/-/${package}-${version}.tgz');
var exec = require('child_process').exec;
var node_download = require('./node_download');

function download (options, callback) {
  var output_path = path.join(config.CACHE_PATH, '/packages', options.package, options.version);
  request(url_template(options))
    .pipe(zlib.Gunzip())
    .pipe(tar.extract(output_path))
    .on('finish', callback)
    .on('error', callback);
}

function build (node, pkg_dir, callback) {
  var env = _.extend({}, process.env, {
    PATH: node.bin + ':' + process.env.PATH
  });

  var child = exec(node.npm + ' install --production', {
    cwd: pkg_dir,
    env: env
  });

  var stderr = '';
  child.stderr.on('data', function (data) {
    stderr += data;
  });

  child.on('exit', function (code) {
    if (code !== 0) {
      return callback(new Error('install failed.\nExit code: ' + code + '\n\nStderr:' + stderr));
    }
    callback();
  });
}

function repackage(pkg_dir) {
  try {
    fs.unlinkSync(pkg_dir + '/binding.gyp');
  } catch(err){}

  return fstream.Reader(pkg_dir)
            .pipe(require('tar').Pack())
            .pipe(zlib.Gzip());
}

module.exports = function (options, callback) {
  var pkg_dir = path.join(config.CACHE_PATH, '/packages', options.package, options.version, 'package');

  if (fs.existsSync(pkg_dir)) {
    return process.nextTick(function () {
      callback(null, repackage(pkg_dir));
    });
  }

  node_download(options.node_version, function (err, node) {
    if (err) return callback(err);

    download(options, function (err) {
      if (err) return callback(err);
      build(node, pkg_dir, function (err) {
        if (err) return callback(err);
        callback(null, repackage(pkg_dir));
      });
    });

  });
};
