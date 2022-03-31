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

const file = () => {
  return {
    fileName: req.file.filename,
    filePath: req.file.path,
    fileType: req.file.mimetype,
    fileSize: fileSizeFormatter(req.file.size, 2),
  };
};

export { file, fileSizeFormatter };
