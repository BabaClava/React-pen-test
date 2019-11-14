'use strict'

/* global __dirname */

const Busboy = require('busboy')
    , fs = require('fs')
    , path = require('path');

const HttpError = require('../../Errors/HttpError')
    , config = require('../../config');

module.exports = (req) => {
    const busboy = new Busboy({headers: req.headers, limit:{file: config.photoMaxSize}});
}

function createFile() {
    const [dir1, dir2, name] = random();
    
    const dir = path.resolve(__dirname, `../../Public/uploads/${dir1}/${dir2}/${name}`);
    const filePath = `${dir}/300.jpg`;
    return fs.promises.mkdir(dir, {recursive: true})
        .then(() => fs.promises.writeFile(filePath))
        .then(() => filePath)
}

function random() {
    const randStr = Math.random().toString(36).slice(2);
    return [randStr.slice(0,2), randStr.slice(2,4), randStr.slice(4)]
}