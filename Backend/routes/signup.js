const { User, validate } = require("../models/user");
const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Signup API ${req.url} @ ${Date.now()}`);
  next();
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { name, email, password } = req.body;

  let user = await User.findOne({ email: email });
  if (user) return res.status(400).send("User already exists.");

  user = new User({ name, email, password });
  await user.save();
  return res.status(200).send(user);
});

module.exports = router;
