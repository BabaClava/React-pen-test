'use strict'
const Cookie = require('../utils/Cookie')
    , HttpError = require('../utils/HttpError')
    , db = require('../db')
    , Serializer = require('../lib/Serializer')

const errors = {
    400: "required uri params(ID = integer)",
    401: "Access denied",
    405: "Method Not Allowed. Allow: GET, POST, DELETE",
    500: "Server error"
}

const response = {
    'resultCode': 1,
    'message': '',
    'data': {}
}

const Follow = (client) => {
    if (client.req.method === 'OPTIONS') {
        client.res.writeHead(200, {"Access-Control-Allow-Headers": 'Accept, Content-Type, Origin'})
        client.res.end()
    }
    const cookie = new Cookie(client);
    const sid = cookie.get()['sid'];
    if (!sid) {
        HttpError(client.res, 401, errors[401]);
        return;
    }
    let followId = client.req.params.id;
    if (followId) {
        followId = Number(followId)
    } else {
        HttpError(client.res, 400, errors[400]);
        return;
    }
    const col = db.getClient().db("usersdb").collection("users");
    col.findOne({'sid': sid})
        .then(user => {
            if (!user) {
                Promise.reject(401)
            } else {
                return user;
            }
        })
        .then(user => {
            switch (client.req.method) {
                case 'GET':
                    return GET_Handler(user);
                case 'POST':
                    return POST_Handler(user, followId);
                case 'DELETE':
                    return DELETE_Handler(user, followId);
                default:
                    Promise.reject(405);
            }
        })
        .then(result => {
            Serializer(result, client)
        })
        .catch(code => {
            HttpError(client.res, code, errors[code]);
        })

    function GET_Handler (user) {
        if (user.followed.includes(followId)) return 'true';
        else return 'false';
    }

    function POST_Handler(user, followId) {
        if (user.followed.includes(followId)) {
            return ({
                ...response,
                message: 'user already followed'
            })
        } else {
            return col.updateOne({userId: user.userId}, {
                $push: {'followed': followId}
                })
                .then(() => {
                    return Promise.resolve({
                        ...response,
                        'resultCode': 0
                    })
                })
                .catch(err => {
                    return Promise.reject({
                        ...response,
                        'message': 'db error'
                    })
                })
        }
    }

    function DELETE_Handler(user, followId) {
        if (!user.followed.includes(followId)) {
            return ({
                ...response,
                'message': 'user is not followed'
            })
        } else {
            return col.updateOne({userId: user.userId}, {
                $pull: {'followed': followId}
                })
                .then(() => {
                    return Promise.resolve({
                        ...response,
                        'resultCode': 0
                    })
                })
                .catch(err => {
                    return Promise.reject({
                        ...response,
                        'message': 'db error'
                    })
                })
        }
    }
}

module.exports = Follow;