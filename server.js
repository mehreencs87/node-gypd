#!/usr/bin/env node

var http = require('http');
var port = process.env.PORT || 8080;
var url  = require('url');

var Route = require('route-parser');
var package_route = new Route('/node/:node_version/packages/:package/:version');

var pkg = require('./lib/pkg');

http.createServer(function (req, res) {
  var params = package_route.match(req.url);
  if (!params) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found\n');
  }
  console.log(req.url, params);

  //${package}-${version}.tgz

  pkg(params, function (err, stream) {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      return res.end(err.message + '\n');
    }

    res.writeHead(200, {
      'content-type': 'application/octet-stream',
      'content-disposition': 'inline; filename="' + params.package + '-' + params.version + '.tgz"'
    });
    stream.pipe(res);
  });

}).listen(port, function (err) {
  if (err) {
    console.error(err.message);
    return process.exit(1);
  }
  console.log('listening on http://localhost:' + port);
});