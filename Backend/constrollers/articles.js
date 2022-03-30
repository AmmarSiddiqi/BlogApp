import { Article, validate } from "../models/articles.js";
import asyncMiddleware from "../middleware/async.js";

const postBlog = asyncMiddleware(async (req, res) => {
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
});
