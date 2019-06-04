'use strict'

const RoutingCreator = (rawRouting) => {
    const _exact = rawRouting;
    const _matching = [];
        for (const key in _exact) {
            if (key.includes(':')) {        // ':' - it`s a random mark that we used in routing before
                const paramsKeys = [];
                key.match(/:[\w]+/g).forEach( par => paramsKeys.push(par.slice(1)) );
                const rx = new RegExp( (key+'/?$').replace(/:[\w]+/g, '(\\d+)') );
                const handler = _exact[key];
                _matching.push([rx, handler, paramsKeys]);
                delete _exact[key];
            }
            /*can add additional type of replaceable mark*/
        }
    return [_exact, _matching]
};

module.exports = RoutingCreator;