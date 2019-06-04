'use strict'
const http = require('http'),
      router = require('./routing/router');

const PORT = 3002;

const server = http.createServer((req, res) => {
    router(req, res);
});
    
server.on("error", err => {
    if (err.code === "EADDRINUSE") {
    console.error(`No access to port: ${PORT}\r\n`);
    }
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(PORT, () => console.log(`Server start on port:${PORT}\r\n`));