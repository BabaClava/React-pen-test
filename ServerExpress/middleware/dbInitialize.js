const db = require('../db');

module.exports = (req, res, next) => {
    db.connect()
        .then(client => {
            next()
        })
        .catch(next)
}