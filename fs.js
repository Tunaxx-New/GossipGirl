const fs      = require('fs')
const urlAvatars = __dirname + '\\html\\icons\\avatars\\'

function checkImage(filename)
{
    let errPNG
    let errJPG
    try {
        fs.openSync(urlAvatars + filename + '.png', 'r')
    } catch (err) {
        errPNG = err
    }
    try {
        fs.openSync(urlAvatars + filename + '.jpg', 'r')
    } catch (err) {
        errJPG = err
    }
    if (errPNG === undefined) {
        return filename + '.png'
    } else if (errJPG === undefined) {
        return filename + '.jpg'
    } else {
        return null
    }
}

function checkFileExists(file) {
    return fs.promises.access(file, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)
}

module.exports = {
    checkImage: checkImage,
    checkFileExists: checkFileExists
}