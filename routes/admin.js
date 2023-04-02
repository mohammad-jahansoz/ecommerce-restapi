const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");

router.get("/api/products", adminController.getPosts);
router.post("/api/product", adminController.addProduct);
router.delete("/api/product/:id", adminController.removeProduct);
router.put("/api/product/:id", adminController.updateProduct);
router.get("/api/products/comments", adminController.getComments);
router.get(
  "/api/product/comments/:id",
  adminController.getCommentsOfSinglePost
);
router.put(
  "/api/product/comment/:productId/:commentId",
  adminController.setReply
);
router.delete(
  "/api/product/comment/:productId/:commentId",
  adminController.deleteComment
);

module.exports = router;