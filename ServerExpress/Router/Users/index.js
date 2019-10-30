const express = require('express');

const LoadUser = require('../../middleware/LoadUser')
    , User = require('../../Models/User');

const app = express();
app.route('/')
    .get(LoadUser, (req, res, next) => {
        User.getAllPaged(req)
            .then(result => {
                res.json(result)
            })
            .catch(next);
    })
    
module.exports = app;