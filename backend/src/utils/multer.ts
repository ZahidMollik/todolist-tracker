import multer from "multer";
import path from "path";
import fs from "fs";

const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,uploadsDir);
  },
  filename:function(req,file,cb){
    const fileName=file.originalname;
    cb(null,fileName);
  }
})

export const upload=multer({
  storage,
  limits:{fieldSize:10*1024*1024},
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  }
})
