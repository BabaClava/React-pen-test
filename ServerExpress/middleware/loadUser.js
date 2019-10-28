'use strict'
const ObjectId = require('mongodb').ObjectID;

const HttpError = require('../Errors/HttpError');

module.exports = (req, res, next) => {
    if(!req.session.user) return next(new HttpError('unauthorized user'));

    req.dbClient.db('usersdb').collection('users').findOne({_id: new ObjectId(req.session.user)})
        .then(user => {
            req.user = user;
            next() 
        })
        .catch(next)
}