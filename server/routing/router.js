'use strict'

const url = require('url');

const RoutingCreator = require('../lib/RoutingCreator')
	, Serializer = require('../lib/Serializer')
	, usersHandler = require('./requestHandlers/users');


const [exact, matching] = RoutingCreator({
		'/api/users': usersHandler,
		'/api/profile/status/:id': 'profile status, need $id. Coming soon',
		'/api/profile/:id': 'profile data, need $id'       //like an express, but we can use ANY SPECIFIC character and replace his later;
	});

const router = client => {
	if (client.req.url === '/') client.req.url = '/index.html';

	const parsedUrl = url.parse(client.req.url, true);
	const params = {};
	params.query = parsedUrl.query;

	const handler = routeMatching(parsedUrl, params);
	Serializer(handler, client, params);
	
}

function routeMatching (parsedUrl, params) {
	let handler = exact[parsedUrl.pathname];
	if (!handler) {
		for (let i = 0; i < matching.length; i++) {
			const rx = matching[i];
			let paramsValues = parsedUrl.pathname.match(rx[0]);
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
	return handler;
}

module.exports = router;