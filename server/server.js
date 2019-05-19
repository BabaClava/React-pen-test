const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {
console.log(url.parse(req.url, true).query);
// count:10
// page:1
   
    if (req.url === '/users') {
        let data = JSON.parse(fs.readFileSync('./data-mocks/users-data.json', 'utf-8'));
        // let a = [];
        // for (let i = 2; i < 4; i++) {
        //     a.push(data[i]);
        // }
        // console.log(a);
        
        
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