const Router = require('express').Router();

Router.use('/status', require('./Status'));
Router.use('/', require('./Profile'));

module.exports = Router;