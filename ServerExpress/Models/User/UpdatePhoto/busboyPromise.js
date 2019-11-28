'use strict'

const fs = require('fs')
    , path = require('path')
    , Busboy = require('busboy');

const HttpError = require('../../../Errors/HttpError')
    , config = require('../../../config');

module.exports = (req, dir) => {
    const busboy = new Busboy({
        headers: req.headers, 
        limits:{
            files: 1,
            fileSize: config.avatar.maxFileSize
        }
    });
    
    return new Promise((resolve, reject) => {
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            let limit_reached = false;
            
            if (mimetype !== 'image/jpg') file.resume();

            console.log('Busboy: start');
            const saveTo = path.join(dir, 'tmp.jpeg');
            const fstream = fs.createWriteStream(saveTo)
            file.pipe(fstream)
            
            file.on('limit', ()=> { 
            /**
             * Because browser can't obtain response
             * before upload finished, I decided to wait it.
             */
                limit_reached = true;       
                console.log('Busboy: limit');       
                file.resume();
            });
            busboy.once('finish', () => {
                console.log('Busboy: finish')
                if (limit_reached) {
                    fs.unlink(saveTo, (err) => {
                        if (err) throw err;
                        reject(new HttpError('file to large'))
                    })
                }
                else resolve(saveTo)
            })
            req.once("close", function() {
            //stop write stream if client force closed the connection
                fstream.end();
                console.log("Busboy: req aborted by client");
                fs.unlink(saveTo, (err) => {
                    if (err) throw err;
                    reject(new HttpError('request closed by client'));
                })
            });
        })
        req.pipe(busboy);
    })   
}