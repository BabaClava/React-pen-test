'use strict'

const path = require('path')
    , fs = require('fs');

const config = require('../../../config');

//create 'per user' tmp dir
exports.createTmpDir = (user) => {
    const id = user._id.toString();
    const tmpDirPath = path.join(global.tmp, id);
    return fs.promises.access(tmpDirPath)
        .catch(() => {
            return fs.promises.mkdir(tmpDirPath)
        })
        .then(() => tmpDirPath)
}

//return exist photo dir path or create new
exports.createRegularDir = (user) => {
    let userDir;
    
    if (user.photos.large !== null) {
        userDir = path.dirname(user.photos.large);
    } else {
        const [dir1, dir2] = random();
        userDir = path.join(config.avatar.path, dir1, dir2, user._id.toString());
    }

    const dirPath = path.join(global.AppRoot, config.static, userDir)
    return fs.promises.mkdir(dirPath, {recursive: true})
        .then(() => userDir);
}
function random() {
    const randStr = Math.random().toString(36).slice(2);
    return [randStr.slice(0,2), randStr.slice(2,4), randStr.slice(4)]
}

exports.clearDir = (dir) => {
    return fs.promises.readdir(dir)
        .then(files => {
            return Promise.all(files.map(file => {
                let filePath = path.join(dir, file);
                return fs.promises.unlink(filePath);
            }))
        })
}

// exports.moveTo = (oldPath, newPath) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(oldPath, (err, data) => {
//             if (err) reject(err)
//             fs.writeFile(newPath, data, (err) => {
//                 if (err) reject(err)
//                 resolve(newPath);
//             })
//         })
//     })
// }
exports.moveTo = (oldPath, newPath) => {
    return fs.promises.readFile(oldPath)
        .then(data => {
            return fs.promises.writeFile(newPath, data)
        })
        .then(() => newPath)
}