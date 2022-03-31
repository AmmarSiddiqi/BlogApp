import { logger } from "../start/logger.js";

export default function error(err, req, res, next) {
  logger.error(err.message, err);
  res.status(500).send("Something failed");
}
