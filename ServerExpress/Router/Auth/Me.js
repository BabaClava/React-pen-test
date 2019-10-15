const express = require('express');
const app = express();

app.route('/')
    .get((req, res) => {
        res.end('auth/me:get')
    })
    
module.exports = app;