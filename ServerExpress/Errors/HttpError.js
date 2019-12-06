'use strict'

module.exports = class HttpError extends Error {
    constructor(msg = '', code = 1) {
        super();
        this.code = code;
        this.message = msg;
    }
}