const express = require('express');

const users = require('../../Models/Users')
    , HttpError = require('../../Errors/HttpError')

const result = {
    resultCode: 1,
    messages: [],
    data: {}
}

const app = express();
app.route('/')
    .delete(deleteHandler)
    .post(postHandler)

function postHandler (req, res) {
    users.login(req)
        .then(user => {
            req.session.user = user._id;
            res.json({
                ...result,
                resultCode: 0,
                data: {
                    userId: user.userId
                }
            })
        })
        .catch(err => {
            let errorMsg = (err instanceof HttpError) ? err.message : 'server error'
            res.json({
                ...result,
                messages: [errorMsg]
            })
        })
}

function deleteHandler(req, res) {
    if (!req.session.user) {
        res.json({
            ...result,
            messages: ['unauthorized user']
        })
    } else {
        req.session.destroy((err) => {
            if (err) {
                res.json({
                    ...result,
                    messages: ['server error']
                })
            } else {
                res.json({
                    ...result,
                    resultCode: 0
                })
            }
        })
    }
}

module.exports = app;