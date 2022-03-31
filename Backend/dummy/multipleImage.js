import mongoose from "mongoose";

const multipleImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    files: [Object],
  },
  { timestamps: true }
);

const MultipleImage = mongoose.model("MultipleImage", multipleImageSchema);

const _MultipleImage = MultipleImage;
export { _MultipleImage as MultipleImage };
