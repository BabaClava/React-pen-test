'use strict'

const Serializer = require('../lib/Serializer')
    , Cookie = require('../utils/Cookie')
    , db = require('../db')
    , Random = require('../utils/RandomString');

let result = {
    resultCode: 0,
    data: {}
};
let random;
//0 - OK
//1 - invalid request
//2 - other problem

const session = (client) => {
    const cookie = new Cookie(client);
    const sid = cookie.get()['sid'];
    if (sid) {
        const col = db.getClient().db('usersdb').collection('users');
        col
            .findOne({'sid': sid})
            .then(user => {
                if (user) {
                    result.resultCode = 0;
                    result.data = {
                        id: user.userId,
                        login: user.fullName,
                        email: user.uniqueUrlName
                    }
                } else {
                    result.resultCode = 1;
                    return Promise.reject('user not found');
                }
            })
            // .then(() => {
            //     return new Promise((res, rej) => {
            //         setTimeout(res, 2000)
            //     })
            // })
            .catch(err => {
                console.error(err)
                result.resultCode = 1
            })
            .finally(() => {
                Serializer(result, client)
            })
    } else {
        result.resultCode = 1;
        console.log('sid not found');
        Serializer(result, client);
    }
}

module.exports = session;