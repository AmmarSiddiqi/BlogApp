import { Router } from "express";
import bcrypt from "bcrypt";
import Joi from "joi";
import { User } from "../models/user.js";
import { joiPassword } from "joi-password";

const router = Router();

router.use((req, res, next) => {
  console.log(`Login API ${req.url} @ ${Date.now()}`);
  next();
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send("Invalid Credentials");
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid Email or Password");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).send("Invalid Email or Password");

  const token = user.generateAuthToken();
  return res.send(token);
});

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().email().min(3).max(256).required().trim(),
    password: joiPassword
      .string()
      .minOfLowercase(2)
      .minOfUppercase(2)
      .minOfNumeric(2)
      .noWhiteSpaces()
      .required(),
  });
  return schema.validate(req);
};

export default router;
