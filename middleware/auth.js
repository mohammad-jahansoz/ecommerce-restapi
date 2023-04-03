const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("access denied. no token provide");
  try {
    const dataInToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = dataInToken;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send("invalid token");
  }
};
