const express = require('express');

const User = require('../../Models/User')
    , IdValidator = require('../../Validators/IdValidator')
    , LoadUser = require('../../middleware/LoadUser');

const response = {
    'resultCode': 0,
    'message': [],
    'data': {}
}
const app = express();
app.use(LoadUser);
app.get('/:id?', IdValidator, getHandler);
app.put('/', putHandler)

function getHandler(req, res, next) {
    User.getProfile(req)
        .then(user => {
            res.json(user);
        })
        .catch(next);
}

function putHandler(req, res, next) {
    User.updateProfile(req)
        .then(() => res.json({
            ...response
        }))
        .catch(next)
}

module.exports = app;