import mongoose from "mongoose";

const singleImageSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SingleImage = mongoose.model("SingleImage", singleImageSchema);

const _SingleImage = SingleImage;
export { _SingleImage as SingleImage };
