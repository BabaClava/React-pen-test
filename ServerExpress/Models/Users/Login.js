const crypto = require('crypto');

const client = require('../../db')
    , config = require('../../config');

module.exports = ({login, password = ''}) => {
    return client.get().db('usersdb').collection('users')
        .findOne({fullName: login})
        .then(user => {
            if (!user) return Promise.reject('user not found');
            const hmac = crypto.createHmac('sha1', config.pwdSecret);
            hmac.update((password).toString());
            const hash = hmac.digest('hex');
            if (user.password === hash) {
                return Promise.resolve(user.userId)
            } else {
                return Promise.reject('Incorrect Password')
            }
        })
}