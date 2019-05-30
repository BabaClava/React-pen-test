'use strict'

const http = require('http');
const url = require('url');

const PORT = 3000;

http.createServer((req,res)=>{
    let regx = new Map([
        [/\/users\/(\d+)$/, 123],
        [/\/users$/, 234]
    ]);

    let a = !![/\/users\/(\d+)$/, /\/users$/].find(reg => reg.test(req.url));
    let str = [];
    regx.forEach((value,key, map)=>str.push(key.test(req.url)));
    res.end(str.join(', '));
   
    if (req.url.match(/users\/(\d+)$/)) {
       // let id = result[1];
        res.end(JSON.stringify(req.url));
    } else if (req.url.match(/users$/)) {
        let result = req.url.match(/users$/);
        res.end(JSON.stringify(result));
    }
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end('Not');
}).listen(PORT, ()=>console.log(`test start on port:${PORT}`))