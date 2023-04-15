const jwt = require("jsonwebtoken");
const User = require("../models/user");
module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");
  try {
    if (token) {
      const dataInToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      if (dataInToken) {
        const user = await User.findById(dataInToken._id).select(
          "-password -createdAt -updatedAt -__v"
        );
        req.user = user;
      }
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send("invalid token");
  }
};
