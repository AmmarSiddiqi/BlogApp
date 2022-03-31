import express from "express";
import auth from "../middleware/auth.js";
import { imageUpload } from "../services/imageUpload.js";
import {
  postBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} from "../controllers/articles.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log(`${req.url} @ ${Date.now()}`);
  next();
});

router.get("/:id?", auth, getBlogs);

router.post("/", [auth, imageUpload.single("file")], postBlog);

router.put("/:id", [auth, imageUpload.single("file")], updateBlog);

router.delete("/:id", auth, deleteBlog);

export default router;
