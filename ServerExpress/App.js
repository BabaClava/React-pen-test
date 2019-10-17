const express = require('express')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    // , cors = require('cors');

const config = require('./config')
    , db = require('./Actions/db')
    , program = require('commander');

program
    .option('-p, --port <type>')
    .option('-t, --test')
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
        ? startWithoutDB()
        : startServer()
})();

function startWithoutDB() {
    App.listen(PORT, () => console.info(`Server start on port:${PORT} \u001b[31m "TEST mode"\x1b[0m\r\n`))
}

function startServer(){ 
    db.connect()
        .then(() => App.listen(PORT, () => console.info(`Server start on port:${PORT}\r\n`)))
        .catch((err) => {
            console.error('\u001b[33m DB not connected\x1b[0m');
            setTimeout(startServer, 5000);
        });
}

process.on("SIGINT", () => {
    db.getClient() && db.getClient().close();
    process.exit();
});