const Product = require("../models/product");
const User = require("../models/user");
exports.addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  try {
    const result = await req.user.addToCart(productId, quantity);

    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.getCart = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const userWithProductsInCart = await User.findById(userId)
      .select("-password -createdAt -updatedAt -__v -isAdmin")
      .populate(
        "cart.productId",
        "-relatedProduct -category -likes -comments -createdAt -updatedAt -__v"
      );
    console.log(userWithProductsInCart);
    res.send(userWithProductsInCart);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
