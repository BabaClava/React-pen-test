'use strict'

const url = require('url'),
      RoutingCreator = require('../lib/RoutingCreator');

const users = require('./requestHandlers/users')

const [exact, matching] = RoutingCreator({
        '/api/users': users,
        '/api/profile/status/:id': 'profile status, need $id. Coming soon',
        '/api/profile/:id': 'profile data, need $id'       //like an express, but we can use ANY SPECIFIC character and replace his later;
    });

const router = (req, res) => {
    const parted_url = url.parse(req.url, true);
    const params = {};
    params.query = parted_url.query;
    let handler = exact[parted_url.pathname];
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
    if (!handler) {
        res.end('not found');
    } else if(typeof handler === 'string') {
        res.end(handler);
        return;
    } else {
        handler(req, res, params);
    }
}

module.exports = router;