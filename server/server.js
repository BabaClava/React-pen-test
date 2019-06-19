'use strict'
const http = require('http')
    , path = require('path');

const router = require('./routing/router')
    , config = require('./config')
    , StaticServe = require('./lib/StaticServe');

const PORT = config.PORT
    , STATIC = config.STATIC;

http
	.createServer((req, res) => {
        
        if (req.url === '/') req.url = '/index.html';

        const ext = path.parse(req.url).ext;
        const staticPath = path.normalize(path.join(__dirname, STATIC));

        ext
        ? StaticServe({req, res}, staticPath)
        : router({ req, res });

	})
    .on("error", err => {
        if (err.code === "EADDRINUSE") {
            console.error(`No access to port: ${PORT}\r\n`);
        }
    })
    .on("clientError", (err, socket) => {
        socket.end("HTTP/1.1 400 Bad Request\r\n");
    })
    .listen(PORT, () => console.info(`Server start on port:${PORT}\r\n`));