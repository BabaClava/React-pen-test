'use strict'

/*global __dirname*/

const express = require('express')
    , process = require('process')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , cors = require('cors')
    // , session = require('express-session')
    // , MongoStore = require('connect-mongo')(session)
    , cookieSession = require('cookie-session')
    , os = require('os')
    , fs = require('fs')
    , path = require('path');

const config = require('./config')
    , db = require('./db')
    , program = require('commander')
    , DbInitialize = require('./middleware/DbInitialize')
    , HttpError = require('./Errors/HttpError');

// BASE SETUP
// ==============================================
program
    .option('-p, --port <type>')
    // .option('-t, --test')
    .parse(process.argv);

global.AppRoot = __dirname;

const sep = path.sep;
const tmpFolder = fs.mkdtempSync(`${os.tmpdir()}${sep}`);
    global.tmp = tmpFolder;
    console.info('tmp folder: ', tmpFolder);

const PORT = parseInt(program.port) || config.port || 3000;

const App = express();
App.use(DbInitialize); //FIXME: dbInitialize not work
const corsOptions = {
    origin: true,
    credentials: true
}
App.use(cors(corsOptions));
App.use(bodyParser.json());
App.use(bodyParser.raw());
App.use(cookieParser());

// SESSIONS
// ==============================================

// App.use(session({
//     secret: config.session.secret,
//     autoReconnect: true,
//     saveUninitialized: false,
//     resave: false,
//     rolling: true,
//     cookie: config.session.cookie,
//     store: new MongoStore({clientPromise: db.get(), 
//                            touchAfter: 1 * 3600,
//                            ttl: 24*60*60})
// }));

App.use(cookieSession({
    name:'SID',
    keys: [config.session.secret]
}))

// ROUTES
// ==============================================
// eslint-disable-next-line no-undef
App.use(express.static(path.join(__dirname, config.static)));
App.use(require('./Router'));

// ERRORS HANDLING
// ==============================================

// eslint-disable-next-line no-unused-vars
App.use((err, req, res, next) => {
    let errorMsg;
    if (err instanceof HttpError) { 
        errorMsg = err.message;
    } else {
        errorMsg = 'server error';
        console.error(err)
    }
    res.json({
        resultCode: 1,
        messages: [errorMsg],
        data: {}
    })
});

// START THE SERVER
// ==============================================
(function start() {
    program.test
        ? testStart()
        : startServer()
})();

function testStart() {
    console.warn('Coming soon');
}

function startServer() {   
    db.get()
        .then(() => {
            App.listen(PORT, () => console.info(`Server start on port:${PORT}\r\n`));        
        })
        .catch(() => {
            console.error('\u001b[33m DB not connected\x1b[0m');
            process.exit();
        })
}

// STOP THE SERVER
// ==============================================
process.on("SIGINT", () => {
    db.close();
    process.exit();
});