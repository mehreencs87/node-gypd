var pkg = require('../lib/pkg');
var assert = require('chai').assert;
var rimraf = require('rimraf');
var fs = require('fs');

function clean () {
  rimraf.sync(__dirname + '/../.cache/node-v0.10.30-darwin-x64');
  rimraf.sync(__dirname + '/../.cache/packages');
}

describe.only('pkg builder', function () {
  before(clean);
  // after(clean);

  it('should work', function (done) {
    pkg({node_version: '0.10.30', version: '1.0.4', package: 'fstream'}, function (err, stream) {
      stream.pipe(fs.createWriteStream('/tmp/foobar.tar.gz'));
        // .on('end', function () {
        //   done();
        // });
      assert.notOk(err);
      done();
    });
  });
});