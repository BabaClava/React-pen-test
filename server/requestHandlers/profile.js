'use strict'

const db = require('../db')
    , HttpError = require('../utils/HttpError')
    , Serializer = require('../lib/Serializer')

const profile = client => {
    if (client.req.method !== "GET") HttpError(client.res, 405, "Method Not Allowed. Allow: GET.");

    let userId = client.req.params.id;
    userId = Number(userId);

    if (isNaN(userId)) HttpError(client.res, 400, 'Bar request');

    const col = db.getClient().db("usersdb").collection("users");

    col
        .findOne({'userId': userId})
        .then((result) => {
            Serializer(result, client);
        })
        .catch((err) => console.error(err));
}

module.exports = profile;