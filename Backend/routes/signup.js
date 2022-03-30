import _ from "lodash";
import bcrypt from "bcrypt";
import { Router } from "express";

import { User, validate } from "../models/user.js";

const router = Router();

router.use((req, res, next) => {
  console.log(`Signup API ${req.url} @ ${Date.now()}`);
  next();
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already exists.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.verified = true;
  await user.save();
  return res.status(200).send(_.pick(user, ["name", "email"]));
});

export default router;
