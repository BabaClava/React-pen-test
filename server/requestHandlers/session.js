'use strict'

const Serializer = require('../lib/Serializer');

const session = client => {
    const cookie = cookieParser();
    if (cookie.sid) {
        //db.find(sid)
        //if
        //recreate sid
        //return {
        //  data:{userId
        //        email
        //        fullName},
        //  resultCode: 0
        //}
    } else {
        // resultCode: 1
    }
    Serializer(result, client)
}

function cookieParser(req) {
    let parsedCookie = {};
    const cookie = req.headers.cookie;
    if (cookie) {
        let rawCookie = cookie.split(';');
        rawCookie.forEach((el) => {
            let part = el.split('=');
            parsedCookie[(part[0])] = part[1] || '';
        });
    }
    return parsedCookie;
}

module.exports = session;