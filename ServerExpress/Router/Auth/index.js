const Router = require('express').Router();
const loadUser = require('../../middleware/loadUser');

Router.use('/me', loadUser, require('./Me'));
Router.use('/login', loadUser, require('./Login'));
Router.use('/registration', require('./Registration'));

module.exports = Router