'use strict'

const path = require('path')
    , sharp = require('sharp');

sharp.cache(false);

module.exports = (file, sizes) => {
    const ext = path.extname(file);
    const dirName = path.dirname(file);

    return Promise.all(sizes.map((size) => {
        return sharp(file)
            .resize(size, size)
            .toFile(`${dirName}/${size}${ext}`)
    }))
}