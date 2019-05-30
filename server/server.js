const http = require('http'),
      fs = require('fs'),
      url = require('url');

const PORT = 3002;

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

const server = http.createServer((req, res) => {
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
        res.end('test\r\n');
});
    
server.on("error", err => {
    if (err.code === "EADDRINUSE") {
    console.error(`No access to port: ${PORT}\r\n`);
    }
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(PORT, () => console.log(`Server start on port:${PORT}\r\n`));