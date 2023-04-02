const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

router.post("/api/auth/signup", authController.postSignUp);
router.post("/api/auth/signin", authController.postSignIn);

module.exports = router;
