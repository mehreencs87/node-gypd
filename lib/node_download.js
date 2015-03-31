var config  = require('../config');
var request = require('request');
var _       = require('lodash');
var path    = require('path');
var fs      = require('fs');

var zlib    = require('zlib');
var tar = require('tar-fs');


var url_template = _.template('http://nodejs.org/dist/v${version}/node-v${version}-${platform}.tar.gz');
var dir_template = _.template(path.join(config.CACHE_PATH, 'node-v${version}-${platform}'));

function build_result (output_path) {
  return {
    path: output_path,
    bin: path.join(output_path, '/bin'),
    npm: path.join(output_path, '/bin/npm'),
  };
}

module.exports = function (version, callback) {
  var url = url_template({ version: version, platform: config.NODE_PLATFORM });

  var output_path = dir_template({
    version: version,
    platform: config.NODE_PLATFORM
  });

  if (fs.existsSync(output_path)) {
    return process.nextTick(function () {
      callback(null, build_result(output_path));
    });
  }

  request.get(url)
    .pipe(zlib.Gunzip())
    .pipe(tar.extract(config.CACHE_PATH))
    .on('error', callback)
    .on('finish', function () {
      callback(null, build_result(output_path));
    });
};