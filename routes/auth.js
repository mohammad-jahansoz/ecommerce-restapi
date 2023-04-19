const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const asyncMiddleware = require("../middleware/async");

router.post("/api/auth/signup", asyncMiddleware(authController.postSignUp));
router.post("/api/auth/signin", asyncMiddleware(authController.postSignIn));
router.post(
  "/api/auth/resetPassword",
  asyncMiddleware(authController.sendPasswordRecoveryEmail)
);
router.put(
  "/api/auth/resetPassword/:email/:token",
  asyncMiddleware(authController.setNewPassword)
);
router.get(
  "/api/auth/resetPassword/:email/:token",
  asyncMiddleware(authController.verifyPasswordRecoveryEmail)
);
// we dont need api for logout , this happen by front-end by delete x-auth-token in Header
module.exports = router;
