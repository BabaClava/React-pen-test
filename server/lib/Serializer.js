'use strict'

const types = {
    'string': primitiveSerialize,
    'number': primitiveSerialize,
    'object': objectSerialize,
    'function': funcSerialize,
    'undefined': undefinedSerialize
}

const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000, // 30 days
        /** add other headers as per requirement */
    };

function Serializer(handler, client) {
    for (const key in headers) {
        client.res.setHeader(key, headers[key])
    }
    types[typeof handler](handler, client);
}

function funcSerialize(handler, client) {
    let result = handler(client);
    if (typeof result === 'function') throw new Error ('Infinity recursion');
    if (result) Serializer(result, client);
}

function primitiveSerialize(handler, client) {
    client.res.writeHead(200, {'Content-Type': 'text/plain'});
    client.res.end(handler.toString());
}

function objectSerialize(handler, client) {
    client.res.writeHead(200, {'Content-Type': 'application/json'});
    client.res.end(JSON.stringify(handler));
}

function undefinedSerialize(handler, client) {
    client.res.statusCode = 404;
    client.res.end('Not found');
}

module.exports = Serializer;