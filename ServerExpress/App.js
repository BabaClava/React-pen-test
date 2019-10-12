const express = require('express');
const App = express();

const PORT = config.port;

App.use('/', (req, res) => {
    res.end('it`s a live!')
});

App
    .listen(PORT, () => console.log('server start on port `${PORT}`'))
    .on("error", err => {
        if (err.code === "EADDRINUSE") {
            console.error(`No access to port: ${PORT}\r\n`);
        }
    })
    .on("clientError", (err, socket) => {
        socket.end("HTTP/1.1 400 Bad Request\r\n");
    })