const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    
    if (req.url === '/users') {
        let data = fs.readFileSync('./data-mocks/users-data.js', 'utf-8');
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
            'Access-Control-Max-Age': 2592000, // 30 days
            "Content-Type": "application/json"
            /** add other headers as per requirement */
          };
        res.writeHead(200, headers)
        res.end(JSON.stringify(data, null, '\t'));
    }
    res.end('test\n');
}).listen(8080, () => console.log('Server start'));