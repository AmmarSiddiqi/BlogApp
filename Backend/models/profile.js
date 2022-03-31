import mongoose from "mongoose";
import Joi from "joi";

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phone: {
    type: String,
    minlength: 4,
    maxlength: 19,
  },
  status: {
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

const Profile = mongoose.model("Profile", profileSchema);

function validateProfile(profile) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    phone: Joi.string().required().min(4).max(19),
    status: Joi.string(),
  });
  return schema.validate(profile);
}

export { Profile, validateProfile as validate };
