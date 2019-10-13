const Router = require('express').Router();

Router.use('/me', require('./Me'));
Router.use('/login', require('./Login'));

module.exports = Router