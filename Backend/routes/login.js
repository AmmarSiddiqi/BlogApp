import { Router } from "express";
const router = Router();
import { validate } from "../models/user.js";

router.use((req, res, next) => {
  console.log(`Login API ${req.url} @ ${Date.now()}`);
  next();
});

router.post("/", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);
  return res.send(req.body);
});

export default router;
