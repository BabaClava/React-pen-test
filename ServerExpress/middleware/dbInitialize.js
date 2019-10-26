const db = require('../db');

module.exports = (req, res, next) => {
    db.get()
        .then((client) => {
            req.dbClient = client
            next();
        })
        .catch(next)
};