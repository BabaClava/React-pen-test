const express = require('express');

const User = require('../../Models/User')
    , IdValidator = require('../../Validators/IdValidator')
    , LoadUser = require('../../middleware/LoadUser');

const app = express();
app.use(LoadUser);
app.get('/:id?', IdValidator, getHandler)

function getHandler(req, res, next) {
    User.getProfile(req)
        .then(user => {
            res.json(user);
        })
        .catch(next);
}

module.exports = app;