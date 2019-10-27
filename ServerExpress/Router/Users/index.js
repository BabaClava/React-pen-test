const express = require('express');

const loadUser = require('../../middleware/loadUser')
    , HttpError = require('../../Errors/HttpError')
    , users = require('../../Models/Users');

const app = express();
app.route('/')
    .get(loadUser, (req, res, next) => {
        if (!req.session.user) return next(new HttpError('unauthorized user'));
        users.getAllPaged(req)
            .then(result => {
                res.json(result)
            })
            .catch(next);
    })
    
module.exports = app;