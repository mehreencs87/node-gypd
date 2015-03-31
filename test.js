var request = require('request');
var zlib = require('zlib');
var tar = require('tar-fs');



request('http://nodejs.org/dist/v0.12.1/node-v0.12.1-darwin-x64.tar.gz')
  .pipe(zlib.Gunzip())
  .pipe(tar.extract(__dirname))
  .on('finish', function () {
    console.log('finish');
  });