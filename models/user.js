const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: String,
    cart: [],
  },
  { timestamps: true }
);

const User = new mongoose.model("user", UserSchema);
module.exports = User;
