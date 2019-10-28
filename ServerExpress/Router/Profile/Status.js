const express = require('express');

const HttpError = require('../../Errors/HttpError')
    , profile = require('../../Models/Profile')
    , IdValidator = require('../../Validators/IdValidator')
    , LoadUser = require('../../middleware/LoadUser');

const response = {
    'resultCode': 0,
    'message': [],
    'data': {}
}

const app = express();
app.use(LoadUser);
app.put('/', putHandler);
app.get('/:id?', IdValidator, getHandler);

function putHandler(req, res, next) {
    req.status = req.body.status.toString();
    if (req.status.length > 300) return next(new HttpError('max length 300'));

    profile.updateStatus(req)
        .then(() => {
            res.json({
                ...response
            })
        })
        .catch(next);
}

function getHandler(req, res, next) {
    profile.getStatus(req)
        .then((status) => {
            res.json(status)
        })
        .catch(next)
}

module.exports = app;