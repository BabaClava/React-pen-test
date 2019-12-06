'use strict';

const rateLimit = require('express-rate-limit');

const options = {
    windowMs: 60*1000,
    max: 3,
    message: 'limit is reached',
    handler: (req, res, next) => {
        req.isLimit = true;
        next();
    },
}

module.exports = rateLimit(options)