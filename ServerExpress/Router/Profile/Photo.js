const express = require('express');

const User = require('../../Models/User')
    , LoadUser = require('../../middleware/LoadUser')
    // , HttpError = require('../../Errors/HttpError')

const response = {
    'resultCode': 0,
    'message': [],
    'data': {}
}

const app = express();
app.put('/',LoadUser, putHandler)

function putHandler(req, res, next) {
    User.updatePhoto(req)
        .then(() => res.json({
            ...response
        }))
        .catch(next)
}

module.exports = app;