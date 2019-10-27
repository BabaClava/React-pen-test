const express = require('express');

const HttpError = require('../../Errors/HttpError');

const result = {
    resultCode: 0,
    messages: [],
    data: {}
}
    
const app = express();
app.get('/', (req, res, next) => {
    if (!req.user) next(new HttpError('unauthorized user'));
    else {
        res.json({
            ...result,
            data: {
                id: req.user.userId,
                login: req.user.fullName,
                email: req.user.uniqueUrlName
            }
        })
    }
})
    
module.exports = app;