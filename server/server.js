'use strict'
const http = require('http');

const router = require('./routing/router');

const PORT = 3002;

http
	.createServer((req, res) => {
    	router({ req, res });
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