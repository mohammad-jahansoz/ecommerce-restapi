const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("access denied. no token provide");
    const dataInToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (dataInToken) {
      return next();
    } else {
      return res.status(401).send("access denied. invelid token");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("invalid token");
  }
};
