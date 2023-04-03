const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const Product = require("../models/product");
const User = require("../models/user");

exports.updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const name = req.body.name;
  const category = req.body.category;
  const relatedProduct = req.body.relatedProduct;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const count = req.body.count;

  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        name: name,
        category: category,
        relatedProduct: relatedProduct,
        price: price,
        imageUrl: imageUrl,
        count: count,
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).send(`we havent any product with ${productId} id`);
    }
    res.status(200).send(product);
  } catch (err) {
    console.log(err);
  }
};

exports.addProduct = async (req, res, next) => {
  const name = req.body.name;
  const count = req.body.count;
  const category = req.body.category;
  const relatedProduct = req.body.relatedProduct;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;

  const product = new Product({
    name: name,
    category: category,
    count: count,
    relatedProduct: relatedProduct,
    price: price,
    imageUrl: imageUrl,
  });
  const result = await product.save();
  res.status(200).send(result);
};

exports.removeProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).send("havent any product with this id");
    }
    return res
      .status(200)
      .send(`product ( ${product.name} )  deleted successfully`);
  } catch (err) {
    console.log(err);
  }
};

exports.getComments = async (req, res, next) => {
  console.log("test get comments");
  const products = await Product.find();
  let comments = [];
  for (let product of products) {
    for (let comment of product.comments) {
      comments.push({ productId: product._id, comment });
    }
  }
  console.log(comments);
  res.send(comments);
};

exports.getCommentsOfSingleProduct = async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  res.status(200).send(product.comments);
};

exports.setReply = async (req, res, next) => {
  const commentId = req.params.commentId;
  const productId = req.params.productId;
  const reply = req.body.reply;
  const product = await Product.updateOne(
    {
      _id: new objectId(productId),
      "comments._id": new objectId(commentId),
    },
    {
      $set: {
        "comments.$.reply": reply,
      },
    }
  );
  res.send(product);
};

exports.deleteComment = async (req, res, next) => {
  const productId = req.params.productId;
  const commentId = req.params.commentId;

  console.log(commentId, productId);
  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $pull: {
          comments: {
            _id: new objectId(commentId),
          },
        },
      },
      { new: true }
    );
    console.log(product);
    res.send(product);
  } catch (err) {
    console.log(err);
  }
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.find().sort({ createdAt: -1 });
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).send(products);
};
