const express = require('express');
const app = express();

app.route('/')
    .delete((req, res) => {
        res.end('auth/login:delete')
    })
    .post((req, res) => {
        res.end('auth/login:post')
    })

module.exports = app;