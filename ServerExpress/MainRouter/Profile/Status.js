const express = require('express');
const app = express();

app.put('/', (req, res) => {
    res.end('profile/status:put');
});
app.get('/:id', (req, res) => {
    res.end(`profile/status:get+${req.params.id}`)
});

module.exports = app;