const express = require('express');
const app = express();

app.get('/:id', (req, res) => {
    res.end(`profile:get+${req.params.id}`)
})

module.exports = app;