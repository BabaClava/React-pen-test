'use strict';

const querystring = require('querystring');
const https = require('https');

const HttpError = require('../Errors/HttpError');

module.exports = (req, res, next) => {
    if (!req.body.captcha ) {
        return next(new HttpError('CAPTCHA is required', 10));
    }

    const options = {
        host: 'www.google.com',
        path: '/recaptcha/api/siteverify',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    const postData = querystring.stringify({
        secret: '6Lf3ucUUAAAAAOqbIGEKYw33Y-_-_36dNk1eFfsz',
        response: req.body.captcha
    });
    const postReq = https.request(options, (response) => {
        let rawBody = '';
        response.on('data', (chunk) => rawBody += chunk );
        response.on('end' ,() => {
            const body = JSON.parse(rawBody);
            body.success ? next() : next(new HttpError ('CAPTCHA not passed'));
            return;
        });
        response.on('error', (err) => {
            return next(err);
        });
    });
    postReq.write(postData);
    postReq.end();
}