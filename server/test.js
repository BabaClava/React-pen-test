'use strict'

const http = require('http');
const url = require('url');

const PORT = 3000;

const routing = {
    '/api/users': 'users data, need query or default params',
    '/api/profile/status/:id': 'profile status, need $id. Coming soon',
    '/api/profile/:id$': 'profile data, need $id'        //like an express, but we can use any SPECIFIC character and replace his later;
};

const matching = [];        //puts all routes like a "/path/:id" in new array
for (const key in routing) {
    if (key.includes(':')) {        // ':' - it`s a random mark that we used in routing before
        const rx = new RegExp( key.replace(/:[\w]+/g, '(\\d+)') );
        const handler = routing[key];
        matching.push([rx, handler]);
        delete routing[key];
    }
    /*can add additional type of replaceable mark*/
}

const types = {
    'string': str => str,
    'number': num => num.toString,
    'object': JSON.stringify,
    'function': (client, fn) => JSON.stringify(fn(client)),
    'undefined': () => 'path not found'
};

const router = client => {
    let params;
    let handler = routing[client.req.url];
    if (!handler) {
        for (let i = 0; i < matching.length; i++) {
            const rx = matching[i];
            params = client.req.url.match(rx[0]);
            if (params) {
                params.shift();     //remove path and leave only specific parameters
                handler = rx[1];
            }
        }
    }
    const type = typeof handler;
    const serializer = types[type];
    const result = serializer(handler, client);
    client.res.end(result);
}

http.createServer((req,res)=>{
    router({req, res});

    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end('Not');
}).listen(PORT, ()=>console.log(`test start on port:${PORT}`))