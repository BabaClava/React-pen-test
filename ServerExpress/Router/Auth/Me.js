const express = require('express');
const app = express();

app.get((req, res) => {
    res.end('auth/me:get')
})
    
module.exports = app;