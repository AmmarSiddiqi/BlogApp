import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { joiPassword } from "joi-password";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 256,
  },
  email: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 256,
    trim: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 256,
  },
  verified: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      name: this.name,
      id: this._id,
      email: this.email,
      verified: this.verified,
    },
    process.env.PRIVATE_TOKEN
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(256),
    email: Joi.string().email().min(3).max(256).required().trim(),
    verfied: Joi.boolean(),
    password: joiPassword
      .string()
      .minOfLowercase(2)
      .minOfUppercase(2)
      .minOfNumeric(2)
      .noWhiteSpaces()
      .required(),
  });
  return schema.validate(user);
}

const _User = User;
export { _User as User };
export const validate = validateUser;
