const express = require('express');

const User = require('../../Models/User');

const result = {
    resultCode: 0,
    messages: [],
    data: {}
}

const app = express();
app.post('/', (req, res, next) => {
    User.registration(req)
        .then(() => res.json({
            ...result
        }))
        .catch(next)
})

module.exports = app;