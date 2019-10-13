const MainRouter = require('express').Router();
const ApiRouter = require('express').Router();

MainRouter.use('/api', ApiRouter);
    ApiRouter.use('/auth', require('./Auth'));
    ApiRouter.use('/users', require('./Users'));
    ApiRouter.use('/profile', require('./Profile'));
    ApiRouter.use('/follow', require('./Follow'));

module.exports = MainRouter;