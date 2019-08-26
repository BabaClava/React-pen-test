'use strict'

const RandomString = require('../utils/RandomString')
    , db = require('../db')
    , crypto = require('crypto')
    , config = require('../config');

let salt;
let resultCode = 0;
//0 - ok
//1 - login already exist
//2 - other problem
const registration = ({req, res}) => {
    if (req.method === 'GET') {
        salt = RandomString();
        res.setHeader("Access-Control-Expose-Headers", "Salt");
        res.setHeader("Salt", salt);
    }
    if (req.method === 'POST') {
        let body = "";
        req.on("data", data => {
            body += data;
        });
        req.on("end", () => {
            const rawData = body.split(":");
            const login = rawData[0];
            const password = rawData[1].split(salt)[0];
            console.log("login:", login);
            console.log("password:", password);
            const col = db.getClient().db("usersdb").collection("users");
            col
                .findOne({'fullName': login})
                .then(result => {
                    if (result !== null) {
                        resultCode = 1;
                    } else {
                        resultCode = 0;
                        let user = createUser(login, password);
                        col.insertOne(user)
                    }
                })
                .catch(err => {
                    console.error(err)
                    resultCode = 2;
                })
        });
    }
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "null",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000,
        "Access-Control-Allow-Credentials": true
    });
    res.end(resultCode.toString());
}

module.exports = registration;

function createUser(login, pwd) {
    const hmac = crypto.createHmac('sha1', config.secret);
    hmac.update(pwd);
    return {
        'fullName': login,
        'password': hmac.digest('hex'),
        'aboutMe': null,
        'contacts': {
            'facebook': null,
            'website': null,
            'vk': null,
            'twitter': null,
            'instagram': null,
            'youtube': null,
            'github': null,
            'mainLink': null
        },
        'lookingForAJob': null,
        'userId': Number(Date.now().toString().slice(5)),
        'photos': {
            'small': null,
            'large': null
        },
        'followed': [],
        'status': null,
        'uniqueUrlName': null
    }
}