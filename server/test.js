'use strict'

const http = require('http')
    , url = require('url')
    , path = require('path');

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
  // extract URL path
  let pathname = `.${parsedUrl.pathname}`;
  // based on the URL path, extract the file extention. e.g. .js, .doc, ...
  const ext = path.parse(pathname).ext;
  console.log(ext);
  res.end(JSON.stringify([parsedUrl, ext]));
}).listen(3002, ()=>console.log('server run on port: 3002'));