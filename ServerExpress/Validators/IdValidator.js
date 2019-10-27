'use strict'

const HttpError = require('../Errors/HttpError');

module.exports = (req, res, next) => {
    req.params.id = parseInt(req.params.id);
    if (isNaN(req.params.id)) next(new HttpError('require #id <type: Number>'))
    else next()
}