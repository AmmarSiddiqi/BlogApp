import { SingleImage } from "../models/singleImage.js";
import { MultipleImage } from "../models/multipleImage.js";
import asyncMiddleware from "../middleware/async.js";

const singleImageUploader = asyncMiddleware(async (req, res) => {
  const file = new SingleImage({
    fileName: req.file.filename,
    filePath: req.file.path,
    fileType: req.file.mimetype,
    fileSize: fileSizeFormatter(req.file.size, 2),
  });
  await file.save();
  res.status(201).send(file);
});

const multipleImageUploader = asyncMiddleware(async (req, res) => {
  let filesArray = [];
  for (let element of req.files) {
    const file = {
      fileName: element.originalname,
      filePath: element.path,
      fileType: element.mimetype,
      fileSize: fileSizeFormatter(element.size, 2),
    };
    filesArray.push(file);
  }

  const multipleImage = new MultipleImage({
    title: req.body.title,
    files: filesArray,
  });
  await multipleImage.save();
  res.status(201).send(multipleImage);
});

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

export { singleImageUploader, multipleImageUploader };
