import mongoose from "mongoose";
import Joi from "joi";

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 999,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  publishDate: {
    type: String,
  },
  editedDate: {
    type: String,
  },
  file: {
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
});

const Article = mongoose.model("Article", articleSchema);

function validateArticle(article) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(99).required(),
    detail: Joi.string().required(),
  });
  return schema.validate(article);
}

export const validate = validateArticle;
const _Article = Article;
export { _Article as Article };
