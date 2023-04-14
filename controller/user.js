const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");
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
  try {
    const userWithProductsInCart = await req.user.populate(
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

exports.setOrder = async (req, res, next) => {
  try {
    const userWithProductsInCart = await req.user.populate(
      "cart.productId",
      "-relatedProduct -category -likes -comments -createdAt -updatedAt -__v -imageUrl"
    );

    const products = userWithProductsInCart.cart.map((i) => {
      const productData = { ...i.productId._doc };
      if (productData.count >= i.quantity) {
        return { ...productData, quantity: i.quantity };
      } else {
        return { ...productData, quantity: productData.count };
      }
    });

    const order = new Order({
      user: {
        _id: req.user._id,
        email: req.user.email,
        name: req.body.name,
        cellPhone: req.body.cellPhone,
        address: {
          province: req.body.address.province,
          city: req.body.address.city,
          address: req.body.address.address,
          postCode: req.body.address.postCode,
        },
      },
      products: products,
    });

    await order.save();
    res.send(order);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.verifyOrder = async (req, res, next) => {
  const orderId = req.body.orderId;
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        $inc: { status: 1 },
        paymentInfo: {
          date: new Date(),
          shopTrackingCode: Math.floor(100000 + Math.random() * 900000),
        },
      },
      { new: true }
    );

    const products = order.products;
    for (const product of products) {
      await Product.findByIdAndUpdate(product._id, {
        $inc: { count: -product.quantity },
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          order: orderId,
        },
        cart: [],
      },
      { new: true }
    );
    console.log(user);
    res.send(order);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
