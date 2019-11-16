'use strict'

/* global __dirname */
/*eslint no-unused-vars: ["error", { "args": "none" }]*/

const Busboy = require('busboy')
    , fs = require('fs')
    , path = require('path');

const HttpError = require('../../Errors/HttpError')
    , config = require('../../config');

module.exports = (req) => {
    let tmpFile, newFile;
    return createTmpDir(req.user._id.toString()) 
        .then(tmpDir => {
            console.log('tmp created');
            //FIXME: busboyPromise not work
            return busboyPromise(tmpDir, req)
        })
        .then(filePath => {
            console.log('tmp file created')
            tmpFile = filePath;
            return tmpFile;
        })
        .then(tmpFile => {
            return createDir(req.user);
        })
        .then(uploadDirPath => {
            newFile = path.join(uploadDirPath, path.basename(tmpFile));
            return fs.promises.rename(tmpFile, newFile);
        })
        .catch(err => {
            /**
             * if tmpFile exist - remove file,
             * if tmpFile not created - it`s global error and rethrow it
             */
            if (tmpFile) {
                return fs.promises.unlink(tmpFile)
            }
            throw err;
        })
}

function createTmpDir(id) {
    const tmpDirPath = path.join(global.tmp, id);
    return fs.promises.access(tmpDirPath)
        .catch(err => {
            return fs.promises.mkdir(tmpDirPath)
        })
        .then(() => tmpDirPath)
}

function createDir(user) {
    //return dir path if it exist or create new
    let filePath;
    if (user.photos.large !== null) {
        filePath = path.dirname(user.photos.large);
    } else {
        const [dir1, dir2] = random();
        filePath = path.join('test', 'uploads', dir1, dir2, user._id.toString());
    }
    const dirPath = path.join(global.AppRoot, filePath)
    return fs.promises.mkdir(dirPath, {recursive: true})
        .then(() => dirPath);
}

function random() {
    const randStr = Math.random().toString(36).slice(2);
    return [randStr.slice(0,2), randStr.slice(2,4), randStr.slice(4)]
}

function busboyPromise (dir, req) {
    const busboy = new Busboy({headers: req.headers, limit:{file: config.photoMaxSize}});
    req.pipe(busboy);
    
    return new Promise((resolve, reject) => {
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            let limit_reached = false;
            
            if (mimetype !== 'image/jpeg') file.resume();

            console.log('start');
            const ext = path.extname(filename);
            const saveTo = path.join(dir, `new300.${ext}`);
            const fstream = fs.createWriteStream(saveTo)
            file.pipe(fstream)
            
            file.once('limit', ()=> { 
            /**
             * Because browser can't obtain response
             * before upload finished, I decided to wait it.
             */
                limit_reached = true;       
                console.log('limit');       
                file.resume();
            });
            busboy.on('finish', () => {
                console.log('finish')
                if (limit_reached) reject(new HttpError('file to large'))
                else resolve(saveTo)
            })
            req.on("close", function(err) {
            //stop write stream if client force closed the connection
                fstream.end();
                console.log("req aborted by client");
                reject(new HttpError('request closed by client'));
            });
        })
    })
    
}
