const express = require('express')
    , process = require('process')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    // , cors = require('cors')
    , session = require('express-session')
    , MongoStore = require('connect-mongo')(session);

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

const PORT = parseInt(program.port) || config.port || 3000;

const App = express();
App.use(DbInitialize);
// App.use(cors());
// App.options('*', cors());
App.use(bodyParser.json());
App.use(bodyParser.raw());
App.use(cookieParser());

// SESSIONS
// ==============================================
App.use(session({
    secret: config.session.secret,
    autoReconnect: true,
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: config.session.cookie,
    store: new MongoStore({clientPromise: db.get(), 
                           touchAfter: 1 * 3600,
                           ttl: 24*60*60})
}));


// ROUTES
// ==============================================
// eslint-disable-next-line no-undef
App.use(express.static(__dirname  + '/Public'));
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