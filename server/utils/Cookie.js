'use strict'

const defaultOptions = require('../config').cookieOptions;

module.exports = class Cookie {
    constructor(client) {
        this.req = client.req;
        this.res = client.res;
    }
    set(name, value, httpOnly = false ,options) {
        const params = {
            ...defaultOptions,
            ...options
        }
        const {path, domain, expires} = params;
        let cookie = `${name}=${value}; domain=${domain}; path=${path}`;
        cookie = expires && cookie + `; expires=${expires}`;
        cookie = httpOnly && cookie + '; HttpOnly';
        this.res.setHeader('Set-Cookie', cookie);
    }
    get() {
        let parsedCookie = {};
        const cookie = this.req.headers.cookie;
        cookie && cookie.split(';').forEach((el) => {
            let parts = el.split('=');
            const key = parts[0].trim();
            const value = parts[1] || '';
            parsedCookie[key] = value.trim();
        })
    return parsedCookie;
    }
    delete(name) {
        const cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        this.res.setHeader('Set-Cookie', cookie);
    }
}