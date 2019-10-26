'use strict'
const ObjectId = require('mongodb').ObjectID;

module.exports = (req, res, next) => {
    if(!req.session.user) return next();

    req.dbClient.db('usersdb').collection('users').findOne({_id: new ObjectId(req.session.user)})
        .then(user => {
            req.user = user;
            next() 
        })
        .catch(next)
}