const express = require('express');

const LoadUser = require('../../middleware/LoadUser')
    , IdValidator = require('../../Validators/IdValidator')
    , HttpErrors = require('../../Errors/HttpError')
    , User = require('../../Models/User');

const result = {
    resultCode: 0,
    messages: [],
    data: {}
}

const app = express();
app.route('/:id?')
    .all(LoadUser)
    .all(IdValidator)
    .get(getHandler)
    .post(postHandler)
    .delete(deleteHandler)
    
// eslint-disable-next-line no-unused-vars
function getHandler(req, res, next) {
    if (req.user.followed.includes(req.params.id)) res.json(true);
    else res.json(false);
}

function postHandler(req, res, next) {
    if (req.user.followed.includes(req.params.id)) return next(new HttpErrors('user already followed'));
    User.follow(req)
        .then(() => res.json({
            ...result
        }))
        .catch(next)
}

function deleteHandler(req, res, next) {
    if (!req.user.followed.includes(req.params.id)) return next(new HttpErrors('user is not followed'));
    User.unfollow(req)
        .then(() => res.json({
            ...result
        }))
        .catch(next)
}

module.exports = app;