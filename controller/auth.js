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
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
  res.send(`create user with ${email} email`);
};

exports.postSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(400)
      .send(`we havent any user with ${email} email . pls signup `);
  }
  const result = await bcrypt.compare(password, user.password);
  console.log(result);
};
