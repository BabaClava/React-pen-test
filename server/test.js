'use strict'

const http = require('http');
const url = require('url');

const PORT = 3000;

const routing = {
    '/api/users': 'users data, need query or default params',
    '/api/profile/status/:id': 'profile status, need $id. Coming soon',
    '/api/profile/:id': 'profile data, need $id'       //like an express, but we can use ANY SPECIFIC character and replace his later;
};

const matching = [];        //puts all routes like a "/path/:id" in new array
for (const key in routing) {
    if (key.includes(':')) {        // ':' - it`s a random mark that we used in routing before
        const paramsKeys = [];
        key.match(/:[\w]+/g).forEach( par => paramsKeys.push(par.slice(1)) );
        const rx = new RegExp( (key+'/?$').replace(/:[\w]+/g, '(\\d+)') );
        const handler = routing[key];
        matching.push([rx, handler, paramsKeys]);
        delete routing[key];
    }
    /*can add additional type of replaceable mark*/
}

const types = {
    'string': str => str,
    'number': num => num.toString,
    'object': JSON.stringify,
    'function': (fn, client, params) => JSON.stringify(fn(client, params)),
    'undefined': () => 'path not found'
};

const router = client => {
    const parted_url = url.parse(client.req.url, true);
    const params = {};
    params.query = parted_url.query;
    let handler = routing[parted_url.pathname];
    if (!handler) {
        for (let i = 0; i < matching.length; i++) {
            const rx = matching[i];
            let paramsValues = parted_url.pathname.match(rx[0]);
            if (paramsValues) {
                handler = rx[1];
                paramsValues.shift();     //remove path and leave only specific parameters
                let paramsKeys = rx[2]
                for (let i = 0; i < paramsKeys.length; i++) {
                    params[(paramsKeys[i])] = paramsValues[i];
                }
                break;
            }
        }
    }
    const type = typeof handler;
    const serializer = types[type];    
    const result = serializer(handler, client, params);
    client.res.end(JSON.stringify(result)); //убрать в кб
}

http.createServer((req,res)=>{
    router({req, res});
}).listen(PORT, ()=>console.log(`test start on port:${PORT}\r\n`))
    .on("error", err => {
        if (err.code === "EADDRINUSE") {
            console.error(`No access to port: ${PORT}\r\n`);
        }
    });

