const express = require('express');
const app = express();

app.route('/:id')
    .get((req, res) => {
        res.end(`auth/users:get+${req.params.id}`)
    })
    .post((req, res) => {
        res.end(`auth/users:post+${req.params.id}`)
    })
    .delete((req, res) => {
        res.end(`auth/users:delete+${req.params.id}`)
    })
    
module.exports = app;