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
    , dbInitialize = require('./middleware/dbInitialize');

program
    .option('-p, --port <type>')
    // .option('-t, --test')
    .parse(process.argv);

const PORT = parseInt(program.port) || config.port || 3000;

const App = express();
App.use(dbInitialize);
// App.use(cors());
// App.options('*', cors());
App.use(bodyParser.json());
App.use(bodyParser.raw());
App.use(cookieParser());

 
App.use(session({     // TODO: rework this crap & try cookie sessions
    secret: config.session.secret,
    autoReconnect: true,
    saveUninitialized: false,
    resave: false,
    cookie: config.session.cookie,
    store: new MongoStore({clientPromise: db.get(), touchAfter: 1 * 3600})
}));

App.use(express.static('Public'));
App.use(require('./Router'));

// eslint-disable-next-line no-unused-vars
App.use((err, req, res, next) => {
    res.status(500);
    res.end()
    console.log(err);
});

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

process.on("SIGINT", () => {
    db.close();
    process.exit();
});