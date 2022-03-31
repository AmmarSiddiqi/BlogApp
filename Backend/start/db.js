import mongoose from "mongoose";
import { logger } from "./logger.js";

mongoose
  .connect(`${process.env.db}`)
  .then(() => logger.info("Connected with Database"))
  .catch((ex) => {
    console.log(ex);
  });
