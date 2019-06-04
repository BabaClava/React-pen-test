'use strict'

const HttpError = (res, status, message) => {
    res.statusCode = status;
    res.end(message);
}

module.exports = HttpError;