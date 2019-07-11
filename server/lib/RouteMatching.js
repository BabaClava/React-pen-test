'use strict'

const url = require('url')

function RouteMatching ([exact, matching], client) {
	
	const params = {};
	const parsedUrl = url.parse(client.req.url, true);
	params.query = parsedUrl.query;
	
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
	client.req.params = params;
	return handler;
}

module.exports = RouteMatching;