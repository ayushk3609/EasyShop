const multer = require('multer')
const path = require('path')

module.exports = multer({
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb) => {
        let ext = path.extname(file.originalname)
        if(ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.JPG'){
            cb(new Error('File Type Not Supported'), false)
            return;
        }
        cb(null,true)
    }
})