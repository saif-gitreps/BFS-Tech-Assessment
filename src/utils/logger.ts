import winston from "winston";
import config from "../config.js";

const { combine, timestamp, colorize, printf, json } = winston.format;

const devFormat = combine(
   colorize(),
   timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
   printf(({ level, message, timestamp, ...meta }) => {
      const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
      return `[${timestamp}] ${level}: ${message}${metaStr}`;
   }),
);

const prodFormat = combine(timestamp(), json());

const logger = winston.createLogger({
   level: config.logging.level,
   format: config.server.nodeEnv === "production" ? prodFormat : devFormat,
   transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "logs/error.log", level: "error" }),
      new winston.transports.File({ filename: "logs/combined.log" }),
   ],
});

export default logger;
