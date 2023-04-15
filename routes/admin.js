const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
const isAuth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

router.get("/api/products", [isAuth, isAdmin], adminController.getProducts);
router.post("/api/product", [isAuth, isAdmin], adminController.addProduct);
router.delete(
  "/api/product/:id",
  [isAuth, isAdmin],
  adminController.removeProduct
);
router.put(
  "/api/product/:id",
  [isAuth, isAdmin],
  adminController.updateProduct
);
router.get(
  "/api/products/comments",
  [isAuth, isAdmin],
  adminController.getComments
);
router.get(
  "/api/product/comments/:id",
  [isAuth, isAdmin],
  adminController.getCommentsOfSingleProduct
);
router.put(
  "/api/product/comment/:productId/:commentId",
  [isAuth, isAdmin],
  adminController.setReply
);
router.delete(
  "/api/product/comment/:productId/:commentId",
  [isAuth, isAdmin],
  adminController.deleteComment
);
router.post(
  "/api/order/search",
  [isAuth, isAdmin],
  adminController.searchOrder
);

module.exports = router;
