'use strict'

/* global __dirname */
/*eslint no-unused-vars: ["error", { "args": "none" }]*/

const Busboy = require('busboy')
    , fs = require('fs')
    , path = require('path');

const HttpError = require('../../Errors/HttpError')
    , config = require('../../config');

module.exports = (req) => {
    return createDir()
        .then(dir => {
            return busboyPromise(dir, req)
        })
        .then
}

function createDir() {
    const [dir1, dir2, name] = random();
    const dir = path.resolve(__dirname, `../../Public/uploads/${dir1}/${dir2}/${name}`);

    return fs.promises.mkdir(dir, {recursive: true})
        .then(() => dir);
}

function busboyPromise (dir, req) {
    const busboy = new Busboy({headers: req.headers, limit:{file: config.photoMaxSize}});
    return new Promise((resolve, reject) => {
        req.pipe(busboy);
        let limit_reached = false
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            if (mimetype !== 'image/jpeg') file.resume();

            console.log('start');
            const ext = path.extname(filename);
            const saveTo = path.join(__dirname, `${dir}/300.${ext}`);
            const fstream = fs.createWriteStream(saveTo)
            file.pipe(fstream)
            let i = 1
            file.on('data', data => {
                console.log(data.length, i++);
            })
            file.once('limit', ()=> {
                limit_reached = true;
                console.log('limit');
                file.resume();
            });
            busboy.on('finish', () => {
                console.log('finish')
                if (limit_reached) reject(filePath)
                else resolve('finish')
            })
            req.on("close", function(err) {
                fstream.end();
                console.log("req aborted by client");
                reject(filePath)
            });
        })
    })
}

function random() {
    const randStr = Math.random().toString(36).slice(2);
    return [randStr.slice(0,2), randStr.slice(2,4), randStr.slice(4)]
}