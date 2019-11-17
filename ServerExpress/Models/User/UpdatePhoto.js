'use strict'

/*eslint no-unused-vars: ["error", { "args": "none" }]*/

const Busboy = require('busboy')
    , fs = require('fs')
    , path = require('path');

const HttpError = require('../../Errors/HttpError')
    , config = require('../../config');

module.exports = (req) => {
    let _tmpFile, _newFile;
    return createTmpDir(req.user._id.toString()) 
        .then(tmpDir => {
            console.log('tmp created');
            return busboyPromise(tmpDir, req)
        })
        .then(tmpFile => {
            console.log('tmp file created:', tmpFile);
            _tmpFile = tmpFile;
            return createDir(req.user);
        })
        .then(newFileDir => {
            console.log('regular dir created')
            _newFile = path.join(newFileDir, path.basename(_tmpFile));
            console.log(_newFile)
            return moveTo(_tmpFile, _newFile);
        })
        .finally(() => {
            console.log('finally')
            if (_tmpFile) {
                return fs.promises.unlink(_tmpFile)
            }
        })
        //TODO: add sharper & insert lint to db;
}

//create 'per user' tmp dir path
function createTmpDir(id) {
    const tmpDirPath = path.join(global.tmp, id);
    return fs.promises.access(tmpDirPath)
        .catch(err => {
            return fs.promises.mkdir(tmpDirPath)
        })
        .then(() => tmpDirPath)
}

//return dir path if it exist or create new
function createDir(user) {
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

//move temp file to work directory
function moveTo(oldPath, newPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(oldPath, (err, data) => {
            if (err) reject(err)
            fs.writeFile(newPath, data, (err) => {
                if (err) reject(err)
                resolve();
            })
        })
    })
}

function busboyPromise (dir, req) {
    const busboy = new Busboy({
        headers: req.headers, 
        limits:{
            files: 1,
            fileSize: config.photoMaxSize
        }
    });
    console.log()
    
    return new Promise((resolve, reject) => {
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            let limit_reached = false;
            
            if (mimetype !== 'image/jpeg') file.resume();

            console.log('start');
            const ext = path.extname(filename);
            const saveTo = path.join(dir, `300${ext}`);
            const fstream = fs.createWriteStream(saveTo)
            file.pipe(fstream)
            
            file.on('limit', ()=> { 
            /**
             * Because browser can't obtain response
             * before upload finished, I decided to wait it.
             */
                limit_reached = true;       
                console.log('limit');       
                file.resume();
            });
            busboy.once('finish', () => {
                console.log('finish')
                if (limit_reached) {
                    fs.unlink(saveTo, (err) => {
                        if (err) throw err;
                        reject(new HttpError('file to large'))
                    })
                }
                else resolve(saveTo)
            })
            req.once("close", function(err) {
            //stop write stream if client force closed the connection
                fstream.end();
                console.log("req aborted by client");
                fs.unlink(saveTo, (err) => {
                    if (err) throw err;
                    reject(new HttpError('request closed by client'));
                })
            });
        })
        req.pipe(busboy);
    })   
}