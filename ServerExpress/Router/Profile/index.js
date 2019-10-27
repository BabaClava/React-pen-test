const Router = require('express').Router();

const loadUser = require('../../middleware/loadUser');

Router.use('/status', loadUser, require('./Status'));
Router.use('/', loadUser, require('./Profile'));

module.exports = Router;