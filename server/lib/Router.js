'use strict'

const Serializer = require('./Serializer')
	, RouteMatching = require('./RouteMatching');

const Router = (routs, client) => {

	if (client.req.method === 'OPTIONS') Serializer('ok', client)
	else {
		const handler = RouteMatching(routs, client);
		Serializer(handler, client);
	}
}

module.exports = Router;