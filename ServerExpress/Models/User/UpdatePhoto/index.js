'use strict'

/*eslint no-unused-vars: ["error", { "args": "none" }]*/

const path = require('path');

const files = require('./files')
    , busboyPromise = require('./busboyPromise')
    , photoResize = require('./photoResize')
    , config = require('../../../config');

module.exports = (req) => {
    const sizes = config.avatar.photoSizes;

    let _tmpDir, _userDir, _ext;
    //create user tmp dir
    return files.createTmpDir(req.user) 
        .then(tmpDir => {
            console.log('tmp created');
            _tmpDir = tmpDir;
            return busboyPromise(req, tmpDir)
        })
        .then(tmpFile => {
            console.log('tmp file created:', tmpFile);
            _ext = path.extname(tmpFile);
            return photoResize(tmpFile, sizes);
        })
        .then(() => {
            // create user dir or return exist
            return files.createRegularDir(req.user);
        })
        .then(userDir => {
            _userDir = userDir;
            console.log('regular dir created')
            const tmpFiles = sizes.map(size => path.join(_tmpDir, `${size}${_ext}`))
            return Promise.all(tmpFiles.map(tmpFile => {
                let newFile = path.join(global.AppRoot, config.static, userDir, path.basename(tmpFile))
                return files.moveTo(tmpFile, newFile);
            }))
        })
        .then(paths => {
            console.log('new path: ', paths)
            return req.dbClient.db("usersdb").collection("users")
                .updateOne({userId: req.user.userId}, {
                    $set: {
                        photos: {
                            large: path.join(_userDir, `300${_ext}`),
                            small: path.join(_userDir, `100${_ext}`),
                        }
                    }
                })
        })
        .finally(() => {
            console.log('finally')
            return files.clearDir(_tmpDir)
        })
}