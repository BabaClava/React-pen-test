'use strict'

const types = {
    'string': (route, client, params) => client.res.end(route),
    'number': (route, client, params) => client.res.end((route).toSting()),
    'object': (route, client, params) => client.res.end(JSON.stringify(route)),
    'function': (route, client, params) => route(client, params),
    'undefined': (route, client, params) => client.res.end('not found')
}

function Serializer(route, client, params) {
    types[typeof route](route, client, params);    
}

module.exports = Serializer;