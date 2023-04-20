const mongoose = require("mongoose");
const logger = require("../startup/logger");

module.exports = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/shop-db");
    logger.info("Connect to MongoDB");
  } catch (err) {
    logger.error(err.message, err);
  }
};
