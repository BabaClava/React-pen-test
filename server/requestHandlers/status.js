'use strict'

const Cookie = require('../utils/Cookie')
    , db = require('../db')
    , HttpError = require('../utils/HttpError')
    , Serializer = require('../lib/Serializer');   

const errors = {
    400: "required uri params(ID = integer)",
    401: "Access denied",
    405: "Method Not Allowed. Allow: GET, PUT",
    500: "Server error"
}

const response = {
    'resultCode': 1,
    'message': '',
    'data': {}
}

const Status = (client) => {
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
    let reqId = client.req.params.id;
    if(reqId) reqId = Number(reqId);

    const col = db.getClient().db("usersdb").collection("users");
    col.findOne({'sid': sid})
        .then(user => {
            if (!user) {
                return Promise.reject(401)
            } else {
                return user;
            }
        })
        .then(user => {
            switch (client.req.method) {
                case 'GET':
                    return GET_Handler(reqId);
                case 'PUT':
                    return PUT_Handler(user.userId);
                default:
                    return Promise.reject(405);
            }
        })
        .then(result => {
            Serializer(result, client)
        })
        .catch(code => {
            HttpError(client.res, code, errors[code]);
        })

    function GET_Handler (id) {
        return col.findOne({userId: id})
            .then(user => {
                return Promise.resolve(user.status || '')
            })
            .catch(err => {
                return Promise.resolve({
                    ...response,
                    message: 'db error'
                });
            })
    }
    function PUT_Handler(id) {
        
        return new Promise((resolve, reject) => {
            let body = "";
            client.req.on("data", data => {
                body += data;
            });
            client.req.on('end', () => {
                const status = JSON.parse(body).status;
                resolve(status);
            })
            client.req.on('error', () => {
                reject(500);
            })
        })
        .then(status => {
            col.updateOne({userId: id}, {
                $set: {'status': status}
            })
        })
        .then(() => {
            return Promise.resolve({
                ...response,
                resultCode: 0
            })
        })
        .catch(err => {
            if(typeof(err) === 'Number') {
                return Promise.reject(err)
            }
            return Promise.resolve({
                ...response,
                message: 'db error'
            });
        })
    }
}

module.exports = Status;