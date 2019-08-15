'use strict'
const http = require('http')
    , path = require('path');

const Router = require('./lib/Router')
    , RoutingCreator = require('./lib/RoutingCreator')
    , StaticServe = require('./lib/StaticServe')
    , config = require('./config')
    , db = require('./db')
    , usersHandler = require('./requestHandlers/users')
    , profileHandler = require('./requestHandlers/profile')
    , registrationHandler = require('./requestHandlers/registration')
    , authorizationHandler = require('./requestHandlers/authorization')
    , sessionHandler = require('./requestHandlers/session');

const PORT = config.port;

const routs = RoutingCreator({
    '/api/users': usersHandler,
    '/api/profile/status/:id': 'profile status, need $id. Coming soon',
    '/api/profile/:id': profileHandler,     //like an express, but we can use ANY SPECIFIC character and replace his later
    '/api/auth/me': sessionHandler,
    '/api/auth/login': authorizationHandler,
    '/api/auth/register': registrationHandler
})

const app = http
	.createServer((req, res) => {
        
        if (req.url === '/') req.url = '/index.html';

        const ext = path.parse(req.url).ext;

        ext
        ? StaticServe({req, res})
        : Router(routs, { req, res });

	})
    .on("error", err => {
        if (err.code === "EADDRINUSE") {
            console.error(`No access to port: ${PORT}\r\n`);
        }
    })
    .on("clientError", (err, socket) => {
        socket.end("HTTP/1.1 400 Bad Request\r\n");
    })

db.connect()
    .then(() => app.listen(PORT, () => console.info(`Server start on port:${PORT}\r\n`)))
    .catch((err) => {throw new Error('no DB connection')});

process.on("SIGINT", () => {
    db.getClient().close();
    process.exit();
});