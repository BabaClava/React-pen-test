'Use strict'

const path = require('path'),
      fs = require('fs');
    //   static = require('node-static');

const staticPath = path.resolve(__dirname + '/../../public');
// const fileServer = new static.Server(staticPath);

const root = ({req, res}, params) => {
    const index = path.resolve(__dirname + '/../../public/index.html');

    fs.readFile(index, (err, data) => {
        if (err) console.log(err);
        else {
            res.setHeader('Content-Type', 'text-html');
            res.end(data);
        }
    })
    
    // req.addListener('end', function () {
        // fileServer.serve(req, res);
    // }).resume();
}

module.exports = root;