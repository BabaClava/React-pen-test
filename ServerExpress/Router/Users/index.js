const express = require('express');

const LoadUser = require('../../middleware/LoadUser')
    , users = require('../../Models/Users');

const app = express();
app.route('/')
    .get(LoadUser, (req, res, next) => {
        users.getAllPaged(req)
            .then(result => {
                res.json(result)
            })
            .catch(next);
    })
    
module.exports = app;