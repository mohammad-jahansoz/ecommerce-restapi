const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.postSignUp = async (req, res, next) => {
  const { email, password } = req.body;
  let findUser = await User.findOne({ email: email });
  if (findUser) {
    return res.status(400).send("you have account in our database . pls login");
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ email: email, password: hash });
    await user.save();
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(user);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

exports.postSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .send(`we havent any user with ${email} email . pls signup `);
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return res.status(400).send("your password is incorrect ! try again");
    }
    const token = user.generateAuthToken();
    console.log(token);
    res.header("x-auth-token", token).send(user);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
