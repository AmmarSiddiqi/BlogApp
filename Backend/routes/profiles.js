import express from "express";
import auth from "../middleware/auth.js";
import { imageUpload } from "../services/imageUpload.js";
import {
  getProfile,
  addProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profiles.js";
import _ from "lodash";

const router = express.Router();

router.get("/:id", auth, getProfile);

router.post("/", [auth, imageUpload.single("file")], addProfile);

router.put("/:id", [auth, imageUpload.single("file")], updateProfile);

router.delete("/:id", auth, deleteProfile);

export default router;
