const express = require("express");
const router = express.Router();
const productsController = require("../controller/products");

router.get("/api/product/:id", productsController.getProduct);
router.put("/api/product/like/:id", productsController.setLike);
router.put("/api/product/comment/:id", productsController.setComment);

module.exports = router;
