const express = require('express');
const app = express();
const users = require('../../Actions/Users')

app.route('/')
    .delete((req, res) => {
        res.end('auth/login:delete')
    })
    .post((req, res) => {
        users.findUser()
        res.end('auth/login:post')
        
    })

module.exports = app;