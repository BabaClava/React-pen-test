'use strict'
const fs = require('fs');
const path = require('path');

const HttpError = require('../../lib/HttpError');

const users = (req, res, params) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        "Content-Type": "application/json"
        /** add other headers as per requirement */
      };

    try {        
        let data = JSON.parse(fs.readFileSync(path.resolve(__dirname + '/../../data-mocks/users-data.json'), 'utf-8'));
        let result = getRes(data, params.query);
        res.writeHead(200, headers);
        res.end(JSON.stringify(result, null, '\t'));  
    } catch (error) {
        console.error(error);
        HttpError(res, 500, 'Server error');
    }

}

const getRes = (data, query) => {
    
    let count = Number(query.count) || 10,
        page = Number(query.page) || 1,
        items = [];
        
    if (count>100) count = 100;

    if (page == 1) {
        items = data.slice(0, count);
    } else {
        let start = (page - 1) * count;
        let end = page * count;
        items = data.slice(start, end);
    }
    return {items, TotalCount: data.length};
}

module.exports = users;