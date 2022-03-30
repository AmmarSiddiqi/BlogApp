import express from "express";
import { Article, validate } from "../models/articles.js";
import asyncMiddleware from "../middleware/async.js";
import { imageUpload } from "../services/imageUpload.js";
import _ from "lodash";
import multer from "multer";

const router = express.Router();

router.use((req, res, next) => {
  console.log(`${req.url} @ ${Date.now()}`);
  next();
});

router.get(
  "/:id?",
  asyncMiddleware(async (req, res) => {
    if (req.params.id) {
      const article = await Article.findById(req.params.id);
      if (!article) return res.status(404).send("404! Blog not found!");
      res.status(200).send(article);
    }
    const articles = await Article.find().select(
      "title detail publishDate file"
    );
    res.status(200).send(articles);
  })
);

router.post(
  "/",
  imageUpload.single("file"),
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const file = {
      fileName: req.file.filename,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };

    const { title, detail } = req.body;
    let article = new Article({
      title,
      detail,
      file,
      publishDate: new Date().toLocaleString(),
    });

    await article.save();
    res.status(200).send(_.pick(article, ["title", "detail", "date", "file"]));
  })
);

router.put(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const { title, detail } = req.body;
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { title, detail, editedDate: new Date().toLocaleString() },
      { new: true }
    );
    if (!article) return res.status(400).send("Invalid Article ID.");
    return res
      .status(200)
      .send(_.pick(article, ["title", "detail", "editedDate"]));
  })
);

router.delete(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(400).send("Invalid Article ID");
    return res.status(200).send(_.pick(article, ["title", "detail"]));
  })
);

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

export default router;
