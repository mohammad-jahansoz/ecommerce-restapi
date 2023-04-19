const express = require("express");
const router = express.Router();
const productsController = require("../controller/products");
const userController = require("../controller/user");
const isAuth = require("../middleware/isAuth");

const asyncMiddleware = require("../middleware/async");

router.get(
  "/api/product/getCart",
  isAuth,
  asyncMiddleware(userController.getCart)
);
router.put(
  "/api/product/like/:id",
  asyncMiddleware(productsController.setLike)
);
router.put(
  "/api/product/comment/:id",
  asyncMiddleware(productsController.setComment)
);
router.put(
  "/api/product/addToCart",
  isAuth,
  asyncMiddleware(userController.addToCart)
);
router.put(
  "/api/product/setOrder",
  isAuth,
  asyncMiddleware(userController.setOrder)
);
router.put(
  "/api/product/verifyOrder",
  isAuth,
  asyncMiddleware(userController.verifyOrder)
);
router.post(
  "/api/product/search",
  asyncMiddleware(productsController.searchProducts)
);
router.get(
  "/api/product/getProduct/:id",
  asyncMiddleware(productsController.getProduct)
);
router.put(
  "/api/product/deleteCartItem",
  isAuth,
  asyncMiddleware(userController.deleteCartItem)
);

module.exports = router;
