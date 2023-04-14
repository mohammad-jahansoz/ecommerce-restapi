const express = require("express");
const router = express.Router();
const productsController = require("../controller/products");
const userController = require("../controller/user");
const isAuth = require("../middleware/auth");

router.get("/api/product/getCart", isAuth, userController.getCart);
router.get("/api/product/:id", productsController.getProduct);
router.put("/api/product/like/:id", productsController.setLike);
router.put("/api/product/comment/:id", productsController.setComment);
router.put("/api/product/addToCart", isAuth, userController.addToCart);
router.put("/api/product/setOrder", isAuth, userController.setOrder);

module.exports = router;
