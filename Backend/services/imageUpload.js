import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const imageUpload = multer({ storage: storage, fileFilter: filefilter });

// const storage = multer.diskStorage({
//   destination: "images",
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "_" + Date.now());
//   },
// });

// const imageUpload = multer({
//   storage,
//   limits: {
//     fileSize: 3000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(png|jpg)$/)) {
//       return cb(new Error("Upload Image"));
//     }
//     cb(undefined, true);
//   },
// });

const _imageUpload = imageUpload;
export { _imageUpload as imageUpload };
export default router;
