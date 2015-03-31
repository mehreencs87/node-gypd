var node_download = require('../lib/node_download');
var rimraf = require('rimraf');
var exec = require('child_process').exec;
var path = require('path');
var assert = require('chai').assert;

function clean () {
  rimraf.sync(__dirname + '/../.cache/node-v0.10.30-darwin-x64');
}

describe('node_download', function () {
  before(clean);
  after(clean);

  it('should work', function (done) {
    node_download('0.10.30', function (err, result) {
      exec(path.join(result.path, '/bin/node') + ' --version', function (err, stdout, stderr) {
        assert.equal(stdout.trim(), 'v0.10.30');
        done();
      });
    });
  });

  it('should use existing one if already downloaded', function (done) {

    node_download('0.10.30', function (err) {
      if (err) return done(err);
      var start = new Date().getTime();
      node_download('0.10.30', function (err, result) {
        var took = (new Date().getTime()) - start;

        assert.closeTo(took, 0, 5);

        exec(path.join(result.path, '/bin/node') + ' --version', function (err, stdout, stderr) {
          assert.equal(stdout.trim(), 'v0.10.30');
          done();
        });
      });
    });

  });

});