const mongoose = require("mongoose");
const Joi = require("joi");
const { joiPassword } = require("joi-password");

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
    maxlength: 15,
  },
  verified: Boolean,
});

// userSchema.method.generateAuthToken = function () {
//   const token = jwt.sign({
//     name: this.name,
//     id: this._id,
//     email: this.email,
//     verified: this.verified,
//   });
//   return token;
// };

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(256).required(),
    email: Joi.string().email().min(3).max(256).required().trim(),
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

exports.User = User;
exports.validate = validateUser;
