const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    cart: [],
    order: [],
  },
  { timestamps: true }
);

const User = new mongoose.model("user", UserSchema);
module.exports = User;
