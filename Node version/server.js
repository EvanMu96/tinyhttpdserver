var http = require('http');
var fs = require('fs');
var os = require('os');
var path = require('path');
var url = require('url');

var getIPv4 = function () {
  var interfaces = os.networkInterfaces();
  var ipv4s = [];

  Object.keys(interfaces).forEach(function (key) {
    interfaces[key].forEach(function (item) {
      if ('IPv4' !== item.family || item.internal !== false)
        return;
      ipv4s.push(item.address);
      console.log(key + '--'+item.address);
    });
  });
  return ipv4s[0];
};

var mime = {
  "html": "text/html",
  "htm": "text/html",
  "css": "text/css",
  "js": "text/javascript",
  "xml": "text/xml",
  "json": "application/json",

  "jpg": "image/jpeg",
  "jpeg": "image/jpeg",
  "png": "image/png",
  "gif": "image/gif",
  "bmp": "image/bmp",
  "svg": "image/svg+xml",
  "ico": "image/x-icon",

  "mp3": "audio/mpeg",
  "wav": "audio/x-wav",
  "mp4": "video/mp4",
  "swf": "application/x-shockwave-flash",

  "woff": "application/x-font-woff"
};

var server = http.createServer(function (req, res) {
  var filename = __dirname + url.parse(req.url).pathname;
  var extname = path.extname(filename);

  extname = extname ? extname.slice(1) : 'unknown';
  var resContentType = mime[extname] || 'text/plain';

  fs.exists(filename, function (exists) {
    if (!exists) {
      res.writeHead(404, {'Content-Type':'text/plain'});
      res.write('404 NOT FOUND');
      res.end();
    } else {
      fs.readFile(filename, function (err, data) {
        if (err) {
          res.writeHead(500, {'Content-Type':'text/plain'});
          res.end(err);
        } else {
          res.writeHead(200, {'Content-Type':resContentType});
          res.write(data);
          res.end();
        }
      });
    }
  });
});

server.listen('8008', function () {
  console.log('server start on ' + getIPv4() +':8008');
});
