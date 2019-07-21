'use strict'

const fs = require('fs')
    , path = require('path')
    , config = require('../config');

const HttpError = require('../utils/HttpError');

const STATIC = config.static;

const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
  };

const StaticServe = (client) => {

    const staticPath = path.join(path.dirname(process.argv[1]), STATIC);
    const pathName = path.normalize(path.join(staticPath, client.req.url));
    const ext = path.parse(pathName).ext;

    fs.access(pathName, fs.constants.F_OK, (err) => {
        if (err) {
            HttpError(client.res, 404, 'File not found');
        } else {
            const file = fs.ReadStream(pathName);
            writeFile(client.res, file, ext)
        }
    });
}

function writeFile (res, file, ext) {
    file.pipe(res);

    file
        .on('error', (err) => {
            console.error(err);
            HttpError(res, 500, 'Server Error')
        })
        .on('open', () => {
            res.setHeader('Content-Type', mimeType[ext] || 'text/plain');
        })
        
    res.on('close', () => {
        file.destroy();
    })
}

module.exports = StaticServe;