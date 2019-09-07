'use strict'

const db = require('../db')
    , Cookie = require('../utils/Cookie')
    , HttpError = require('../utils/HttpError')
    , crypto = require('crypto')
    , config = require('../config')
    , Serializer = require('../lib/Serializer')
    , randomString = require('../utils/RandomString');

const errors = {
    401: "Access denied",
    405: "Method Not Allowed. Allow: POST, DELETE",
    500: "Server error",
    502: "Bad Gateway"
}
    
const response = {
    'resultCode': 1,
    'message': '',
    'data': {}
}

const Login = (client) => {
    switch (client.req.method) {
        case 'OPTIONS':
            OPTIONS_Handler(client);
            break;
        case 'POST':
            POST_Handler(client);
            break;
        case 'DELETE':
            DELETE_Handler(client);
            break;
        default:
            HttpError(client.res, 405, errors[405])
            break;
    }
}

function OPTIONS_Handler({req, res}) {
    res.writeHead(200, {"Access-Control-Allow-Headers": 'Accept, Content-Type, Origin'})
    res.end()
}

function POST_Handler({req, res}) {
    const col = db.getClient().db('usersdb').collection('users');
    let formData = {
        rememberMe: false
    }

    new Promise((resolve, reject) => {
        let body = "";
        req.on("data", data => {
            body += data;
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            resolve(data);
        })
        req.on('error', () => {
            reject(502);
        })
    })
    .then(data => {
        formData = {...formData, ...data};
        return col.findOne({fullName: formData.login})
    })
    .then(user => {
        const hmac = crypto.createHmac('sha1', config.secret);
        hmac.update((formData.password).toString());
        const hash = hmac.digest('hex');
        if (user.password === hash) {
            return Promise.resolve(user)
        } else {
            return Promise.reject(401)
        }
    })
    .then((user) => {
        const cookie = new Cookie({req, res});
        const sid = randomString();
        if (formData.rememberMe) {
            const expires = 'Fri, 01 Jan 2100 00:00:00 GMT'
            cookie.set('sid', sid, true, {'expires': expires})
            return col.updateOne({userId: user.userId}, {
                $set: {sid: sid}
            })
        } else {
            cookie.set('sid', sid, true);
        }
    })
    .then(() => {
        Serializer({
            ...response,
            resultCode: 0
        }, {req, res})
    })
    .catch((err) => {
        if (typeof(err) === 'Number') {
            Serializer({
                ...response,
                resultCode: 1,
                message: `${errors[err]}`
            }, {req, res})
        } else {
            HttpError(res, 500, errors[500])
        }
    })
}

function DELETE_Handler(client) {
    const cookie = new Cookie(client)
    const sid = cookie.get()['sid'];
    if (!sid) {
        HttpError(client.res, 401, errors[401]);
        return;
    }
    const col = db.getClient().db('usersdb').collection('users');
    col.updateOne({sid: sid},{
        $set: {sid: null}
    })
    .then(() => {
        cookie.delete(sid)
    })
    .then(() => {
        Serializer({
            ...response,
            resultCode: 0
        }, client)
    })
    .catch((err) => {
        Serializer({
            ...response,
            message: 'Server Error'
        })
    })
}

module.exports = Login;