const Router = require('express').Router();

Router.use('/me', require('./Me'));
Router.use('/login', require('./Login'));
Router.use('/registration', require('./Registration'));

module.exports = Router