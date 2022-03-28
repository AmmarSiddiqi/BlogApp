const express = require("express");
const router = express.Router();
const { validate } = require("../models/user");

router.use((req, res, next) => {
  console.log(`Login API ${req.url} @ ${Date.now()}`);
  next();
});

router.post("/", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);
  return res.send(req.body);
});

module.exports = router;
