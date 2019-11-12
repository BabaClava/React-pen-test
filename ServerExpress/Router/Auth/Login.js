const express = require('express');

const User = require('../../Models/User')
    , LoadUser = require('../../middleware/LoadUser');

const result = {
    resultCode: 0,
    messages: [],
    data: {}
}

const app = express();
app.route('/')
    .delete(LoadUser, deleteHandler)
    .post(postHandler)

function postHandler (req, res, next) {
    User.login(req)
        .then(user => {
            req.session.user = user._id;
            // if (req.body.rememberMe) req.session.cookie.expires = new Date('Fri, 01 Jan 2100 00:00:00 GMT'); //if used express-sessions
            if (req.body.rememberMe) req.sessionOptions.expires = new Date('Fri, 01 Jan 2100 00:00:00 GMT'); // if used cookie-sessions
            res.json({
                ...result,
                data: {
                    userId: user.userId
                }
            })
        })
        .catch(next);
}
// eslint-disable-next-line no-unused-vars
function deleteHandler(req, res, next) {
    // req.session.destroy((err) => { //if used express-sessions
    //     if (err) next(err);
    //     else {
    //         res.json({
    //             ...result
    //         })
    //     }
    // })
    req.session = null // if used cookie-sessions
    res.json({
        ...result
    })
}

module.exports = app;