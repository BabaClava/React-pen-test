'use strict'

const Serializer = require('./Serializer')
	, RouteMatching = require('./RouteMatching');

const Router = (routs, client) => {
		
	const handler = RouteMatching(routs, client);
	Serializer(handler, client);
}

module.exports = Router;