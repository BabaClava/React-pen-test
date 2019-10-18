const express = require('express')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    // , cors = require('cors');

const config = require('./config')
    , db = require('./Models/db')
    , program = require('commander');

program
    .option('-p, --port <type>')
    // .option('-t, --test')
    .parse(process.argv);

const PORT = parseInt(program.port) || config.port || 3000;

const App = express();
// App.use(cors());
// App.options('*', cors());
App.use(bodyParser.json());
App.use(bodyParser.raw());
App.use(cookieParser());

App.use(express.static('Public'))
App.use(require('./Router'));

(function start() {
    program.test
        ? testStart()
        : startServer()
})();

function testStart() {
    console.warn('Coming soon');
}

function startServer(){ 
    db.connect((err) => {
        if(err) {
            setTimeout(startServer, 5000);
            return console.error('\u001b[33m DB not connected\x1b[0m');
        }
        App.listen(PORT, () => console.info(`Server start on port:${PORT}\r\n`))
    })
}

process.on("SIGINT", () => {
    db.get() && db.get().close();
    process.exit();
});