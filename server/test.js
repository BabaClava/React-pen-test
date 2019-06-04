'use strict'

const http = require('http'),
      fs = require('fs');

const router = require('./routing/router');

const PORT = 3002;

      http.createServer((req,res)=>{
          //router({req, res});
}).listen(PORT, ()=>console.log(`test start on port:${PORT}\r\n`))
    .on("error", err => {
        if (err.code === "EADDRINUSE") {
            console.error(`No access to port: ${PORT}\r\n`);
        }
    });

