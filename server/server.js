const http = require('http');
const fs = require('fs');
const url = require('url');

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
    return result = {items, TotalCount: data.length};

}

const server = (req, res) => {
    let query = url.parse(req.url, true).query;
    let path = url.parse(req.url).pathname;
       
        if (path === '/users') {
            let data = JSON.parse(fs.readFileSync('./data-mocks/users-data.json', 'utf-8'));
            let result = getRes(data, query);
            
            const headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
                'Access-Control-Max-Age': 2592000, // 30 days
                "Content-Type": "application/json"
                /** add other headers as per requirement */
              };
            res.writeHead(200, headers)
            res.end(JSON.stringify(result, null, '\t'));
        }
        res.end('test\n');
    };

http.createServer(server).listen(8080, () => console.log('Server start'));