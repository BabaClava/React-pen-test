const express = require('express');

const LoadUser = require('../../middleware/LoadUser');

const result = {
    resultCode: 0,
    messages: [],
    data: {}
}
    
const app = express();
// eslint-disable-next-line no-unused-vars
app.get('/', LoadUser, (req, res, next) => {
    res.json({
        ...result,
        data: {
            id: req.user.userId,
            login: req.user.fullName,
            email: req.user.uniqueUrlName
        }
    })
})
    
module.exports = app;