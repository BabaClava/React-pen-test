const express = require('express');

const users = require('../../Models/Users');

const result = {
    resultCode: 1,
    messages: [],
    data: {}
}

const app = express();
app.route('/')
    .delete((req, res) => {
        res.end('auth/login:delete')
    })
    .post((req, res) => {
        users.login({login: req.body.login, password: req.body.password})
            .then(id => {
                res.json({
                    ...result,
                    resultCode: 0,
                    data: {
                        userId: id
                    }
                })
            })
            .catch(err => {
                let errorMsg = err
                if (err instanceof Error) {
                    errorMsg = 'server error';
                    console.error(err);
                }
                res.json({
                    ...result,
                    messages: [errorMsg]
                })
            })
    })

module.exports = app;