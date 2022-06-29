const multer = require("multer");
const path = require("path");

//multer config
module.exports = multer({   //object..
    storage: multer.diskStorage({}),
    //fileFilter is to filter file which we want to allow.
    fileFilter: (req, file, cb) => {      /*cb is callback (it will take 2 args (one is error 
        another is boolean(boolean is for wheather accept files or not))) */
        let ext = path.extname(file.originalname);  //extname is used to extract the name of extension..
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("file type not supported!"), false);
            return;
        }
        cb(null, true)
    }
});