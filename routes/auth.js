const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

router.post("/api/auth/signup", authController.postSignUp);
router.post("/api/auth/signin", authController.postSignIn);
// we dont need api for logout , this happen by front-end
module.exports = router;
