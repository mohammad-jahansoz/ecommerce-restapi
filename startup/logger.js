const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.MongoDB({
      db: "mongodb://127.0.0.1:27017/shop-db",
      level: "info",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: "uncaughtExceptions.log",
      format: winston.format.json(),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: "uncaughtExceptions.log",
      format: winston.format.json(),
    }),
  ],
});

module.exports = logger;
