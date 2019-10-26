
const crypto = require('crypto');

const config = require('../../config')
    , HttpError = require('../../Errors/HttpError');

module.exports = ({body:{login, password = ''}, dbClient}) => {
    return dbClient.db('usersdb').collection('users').findOne({fullName: login})
        .then(user => {
            if (!user) throw new HttpError('user not found');

            const hmac = crypto.createHmac('sha1', config.pwdSecret);
            hmac.update((password).toString());
            const hash = hmac.digest('hex');

            if (user.password !== hash) throw new HttpError('Incorrect Password')

            return user;
        })
}