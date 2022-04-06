import winston from "winston";
import { transports, format, createLogger } from "winston";
import "winston-mongodb";

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "logfile.log",
      level: "info",
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
      ),
    }),
    new transports.File({
      filename: "errors.log",
      level: "error",
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
      ),
    }),
    new winston.transports.MongoDB({
      level: "error",
      db: process.env.db,
      collection: "error",
      options: { useUnifiedTopology: true },
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
      ),
    }),
  ],
});

export { logger };
