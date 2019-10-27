const express = require('express');

const auth = require('../../Models/Auth')
    , HttpError = require('../../Errors/HttpError');

const result = {
    resultCode: 0,
    messages: [],
    data: {}
}

const app = express();
app.route('/')
    .delete(deleteHandler)
    .post(postHandler)

function postHandler (req, res, next) {
    auth.login(req)
        .then(user => {
            req.session.user = user._id;
            if (req.body.rememberMe) req.session.cookie.expires = new Date('Fri, 01 Jan 2100 00:00:00 GMT');
            res.json({
                ...result,
                data: {
                    userId: user.userId
                }
            })
        })
        .catch(next);
}
function deleteHandler(req, res, next) {
    if (!req.session.user) next(new HttpError('unauthorized user'));
    else {
        req.session.destroy((err) => {
            if (err) next(err);
            else {
                res.json({
                    ...result
                })
            }
        })
    }
}

module.exports = app;