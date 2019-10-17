const express = require('express');
const app = express();

app.post((req, res) => {
    res.end('auth/registration:post')
})
    
module.exports = app;