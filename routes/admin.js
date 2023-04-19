const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const asyncMiddleware = require("../middleware/async");

router.get(
  "/api/products",
  isAdmin,
  asyncMiddleware(adminController.getProducts)
);
router.post(
  "/api/product",
  isAdmin,
  asyncMiddleware(adminController.addProduct)
);
router.delete(
  "/api/product/:id",
  isAdmin,
  asyncMiddleware(adminController.removeProduct)
);
router.put(
  "/api/product/:id",
  isAdmin,
  asyncMiddleware(adminController.updateProduct)
);
router.get(
  "/api/products/comments",
  isAdmin,
  asyncMiddleware(adminController.getComments)
);
router.get(
  "/api/product/comments/:id",
  isAdmin,
  asyncMiddleware(adminController.getCommentsOfSingleProduct)
);
router.put(
  "/api/product/comment/:productId/:commentId",
  isAdmin,
  asyncMiddleware(adminController.setReply)
);
router.delete(
  "/api/product/comment/:productId/:commentId",
  isAdmin,
  asyncMiddleware(adminController.deleteComment)
);
router.post(
  "/api/order/search",
  isAdmin,
  asyncMiddleware(adminController.searchOrder)
);

module.exports = router;
