import express from "express";
import { SingleImage } from "../models/singleImage.js";
import { imageUpload } from "../services/imageUpload.js";
import {
  singleImageUploader,
  multipleImageUploader,
} from "../constrollers/imageUploader.js";

const router = express.Router();

router.post("/singleImage", imageUpload.single("file"), singleImageUploader);
router.post(
  "/multipleImage",
  imageUpload.array("files", 6),
  multipleImageUploader
);

router.get("/singleImage", async (req, res) => {
  const image = await SingleImage.find();
  res.send(image);
});

export default router;
