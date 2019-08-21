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
    //console.log(req.headers)
    const cookie = new Cookie(client);
    const sid = cookie.get()['sid'];
    if (sid) {
        const col = db.getClient().db('usersdb').collection('users');
        col
            .findOne({'sid': sid})
            .then(user => {
                if (user) {
                    result.resultCode = 0;
                    console.log(0)
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
            .then (() => {
                random = Random();
                return col
                    .updateOne({'sid': sid}, {$set: {'sid': random}})
                        
            })
            .then(() => {
                cookie.set('sid', random, true)
            })
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