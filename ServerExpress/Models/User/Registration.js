'use strict'

const crypto = require('crypto');

const AutoIncrement = require('../../Utils/AutoIncrement')
    , userMock = require('./UserMock')
    , HttpError = require('../../Errors/HttpError')
    , config = require('../../config');

module.exports = ({dbClient, body:{login, password}}) => {
    if (!login) throw new HttpError('Login is missing');
    if (!password) throw new HttpError('Password is missing');
    return dbClient.db('usersdb').collection('users')
        .findOne({fullName: login})
        .then(result => {
            if (result !== null) throw new HttpError('login already exist');
            return;
        })
        .then(() => {
            return AutoIncrement(dbClient, 'userid')
        })
        .then(id => {
            return createUser(login, password, id)
        })
        .then(user => {
            dbClient.db('usersdb').collection('users').insertOne(user)
        })
}

function createUser(login, password, id) {
    const hmac = crypto.createHmac('sha1', config.pwdSecret);
    hmac.update(password.toString());
    const pwdHash = hmac.digest('hex');
    return {
        ...userMock,
        fullName: login,
        password: pwdHash,
        userId: id
    }
}