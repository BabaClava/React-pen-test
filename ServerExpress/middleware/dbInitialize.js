const db = require('../db');

function dbInitialize (req, res, next) {
    db.connect()
        .then(client => {
            console.log('db connected');
            next()
        })
        .cath(err => {
            console.error('\u001b[33m DB not connected\x1b[0m');
            // setTimeout(dbInitialize, 5000);
            next(err)
        })
}

module.exports = dbInitialize;