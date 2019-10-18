const express = require('express');
const app = express();
const users = require('../../Models/Users')

app.route('/')
    .delete((req, res) => {
        res.end('auth/login:delete')
    })
    .post((req, res) => {
        users.findUser('BabaClava').then(user => console.log(user))
        res.end('auth/login:post')
    })

module.exports = app;