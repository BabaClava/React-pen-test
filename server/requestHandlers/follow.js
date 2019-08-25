'use strict'
const Cookie = require('../utils/Cookie')
    , HttpError = require('../utils/HttpError')
    , db = require('../db');

const errors = {
    400: "required uri params(ID = integer)",
    401: "Access denied",
    405: "Method Not Allowed. Allow: GET, POST, DELETE",
    500: "Server error"
}

const Follow = (client) => {
    const cookie = new Cookie(client);
    const sid = cookie.get()['sid'];
    if (!sid) {
        HttpError(client.res, 401, errors[401]);
        return;
    }
    const followId = client.req.params.id;
    if (id) {
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
            Serialize(result, client)
        })
        .catch(code => {
            HttpError(client.res, code, errors[code]);
        })

    function GET_Handler (user) {
        if (user.followed.include(followId)) return 'true';
        else return 'false';
    }

    function POST_Handler(user, followId) {
        const response = {
            resultCode: 1,
            message: '',
            data: {}
        }
        if (user.followed.include(followId)) {
            return ({
                ...response,
                message: 'user already followed'
            })
        } else {
            return col.updateOne({userId: user.userId}, {
                $push: {'followed': followedId}
                }, (err, result) => {
                    if (err) return Promise.reject(500)
                    else {
                        return ({
                            ...response,
                            resultCode = 0
                        })
                    }
                })
        }
    }

    function DELETE_Handler(user, followId) {
        if (user.followed.include(followId)) {
            return ({
                ...response,
                message: 'user is not followed'
            })
        } else {
            return col.updateOne({userId: user.userId}, {
                $pull: {'followed': followedId}
                }, (err, result) => {
                    if (err) return Promise.reject(500)
                    else {
                        return ({
                            ...response,
                            resultCode = 0
                        })
                    }
                })
        }
    }
}

module.exports = Follow;