const express = require('express')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser');

const config = require('./config')
    , db = require('./Actions/db');

const PORT = process.argv[2] || config.port || 3000;
const App = express();

App.use(bodyParser.json());
App.use(cookieParser());

App.use(require('./Router'));

(function startServer(){ 
    db.connect()
        .then(() => App.listen(PORT, () => console.info(`Server start on port:${PORT}\r\n`)))
        .catch((err) => {
            console.error('DB not connected');
            setTimeout(startServer, 5000);
        });
})()

process.on("SIGINT", () => {
    db.getClient() && db.getClient().close();
    process.exit();
});