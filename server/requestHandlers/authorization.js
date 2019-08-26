"use strict";

const RandomString = require('../utils/RandomString')
    , db = require('../db')
    , crypto = require('crypto')
    , config = require('../config')
    , Cookie = require('../utils/Cookie');

let salt;
let result = {
    resultCode: 0,
    data: {}
};
//0 - OK
//1 - invalid request
//2 - other problem
const authorization = ({req, res}) => {
    if (req.method === "GET") {
        salt = RandomString();
        res.setHeader("Access-Control-Expose-Headers", "Salt");
        res.setHeader("Salt", salt);
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "null",
            "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
            "Access-Control-Max-Age": 2592000,
            "Access-Control-Allow-Credentials": true,
        });
        res.end();
    }
    if (req.method === "POST") {
        let body = "";
        req.on("data", data => {
            body += data;
        });
        req.on("end", () => {
            const rawData = body.split(":");
            const login = rawData[0];
            const password = rawData[1].split(salt)[0];
            console.log("login:", login);
            console.log("password", password);
            const col = db.getClient().db('usersdb').collection('users');
            col
                .findOne({'fullName': login})
                .then(user => {
                    if (user !== null) {
                        const hmac = crypto.createHmac('sha1', config.secret);
                        hmac.update(password)
                        const hash = hmac.digest('hex');
                        if (user.password === hash) {
                            result.resultCode = 0;
                            result.data.userId = user.userId;
                            const cookie = new Cookie({req, res});
                            const sid = RandomString();
                            //const expires = new Date(Date.now() + 10*60*1000)
                            cookie.set('sid', sid, true/*, {'expires': expires}*/);
                            col.updateOne({'userId': user.userId}, {$set: {'sid': sid}})
                        } else {
                            result.resultCode = 1;
                            console.log('password mot match');
                        }
                    } else {
                        result.resultCode = 1;
                    }
                })
                .catch(err => {
                    console.error(err);
                    result.resultCode = 1;
                    console.log('user not found')
                })
                .finally((() => {
                    res.writeHead(200, {
                        "Access-Control-Allow-Origin": "null",
                        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
                        "Access-Control-Max-Age": 2592000,
                        "Access-Control-Allow-Credentials": true,
                        "Content-Type": "application/json"
                    });
                    res.end(JSON.stringify(result))
                }))
        });
    }
};

module.exports = authorization;
