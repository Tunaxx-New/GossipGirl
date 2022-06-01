const multer = require("multer")
const path = require("path");

//Avatar storage
const imageStorage = multer.diskStorage({
    destination:  __dirname + '/html/icons/avatars',
    filename: (req, file, cb) => {
        cb(null, req.cookies.login + path.extname(file.originalname))
    }
});
const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 10000000 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Please upload a Image in png or jpg!'))
        }
        cb(undefined, true)
    }
})

//Post storage
const imageStoragePost = multer.diskStorage({
    destination:  __dirname + '/html/icons/postImages',
    filename: (req, file, cb) => {
        cb(null, req.cookies.currentIdPost + path.extname(file.originalname))
    }
});
const imageUploadPost = multer({
    storage: imageStoragePost,
    limits: {
        fileSize: 10000000 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Please upload a Image in png or jpg!'))
        }
        cb(undefined, true)
    }
})

module.exports = {
    imageUpload: imageUpload,
    imageUploadPost: imageUploadPost
}