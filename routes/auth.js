const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

router.post("/api/auth/signup", authController.postSignUp);
router.post("/api/auth/signin", authController.postSignIn);
router.post(
  "/api/auth/resetPassword",
  authController.sendPasswordRecoveryEmail
);
// we dont need api for logout , this happen by front-end by delete x-auth-token in Header
module.exports = router;
