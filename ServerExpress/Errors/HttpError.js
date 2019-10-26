'use strict'

module.exports = class HttpError extends Error {
    constructor(msg) {
        super();
        this.message = msg;
    }
}