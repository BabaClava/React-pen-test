'use strict'
const http = require('http')
    , path = require('path');

const router = require('./routing/router')
    , StaticServe = require('./lib/StaticServe')
    , config = require('./config');

const PORT = config.PORT;

http
	.createServer((req, res) => {
        
        if (req.url === '/') req.url = '/index.html';

        const ext = path.parse(req.url).ext;

        ext
        ? StaticServe({req, res})
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