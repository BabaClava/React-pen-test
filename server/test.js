'use strict'

const http = require('http')

http.createServer((req, res) => {
    console.log(process.argv);
    res.end();
}).listen(3002, ()=>console.log('server run on port: 3002'));