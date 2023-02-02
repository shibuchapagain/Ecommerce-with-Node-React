const fs = require('fs');

const multer = require("multer");
const diskStore = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(req.upload_path)
        fs.mkdirSync(req.upload_path, {recursive: true})
        cb(null, req.upload_path);
    },
    filename: (req, file, cb) => {
        let file_name = Date.now()+file.originalname;
        // req.body.image = file_name;
        cb(null, file_name)
    }
});
const imageFilter = (req, file, cb) => {
    // a.b.c.jpg => ["a", "b", "c", "JPG"]
    let ext = (file.originalname.split(".")).pop();   // array
    if(['jpeg','jpg','png','gif','svg','webp', 'bmp'].includes(ext.toLowerCase())){
        cb(null, true);
    } else {
        cb({status: 400, msg: "Invalid image format"}, null)
    }
}
const uploader = multer({
    storage: diskStore,
    fileFilter: imageFilter,
    limits: {
        fileSize: 10000000, // 10m
    }
})

// aws s3 bucket 
module.exports = uploader;