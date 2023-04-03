const { mongoose } = require("mongoose");
const Product = require("../models/product");
exports.getProduct = async (req, res, next) => {
  const productId = req.params.id;
  console.log(productId);
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(200).send("you send invelid id , ply try again");
  }
  const product = await Product.findById(productId);
  if (!product)
    return res.status(404).send(`we havent any product with ${productId} id`);
  res.status(200).send(product);
};

exports.setLike = async (req, res, next) => {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).send("you send invalid id , ply try again");
  }
  const product = await Product.findByIdAndUpdate(
    productId,
    {
      $push: {
        likes: new Date().toISOString(),
      },
    },
    { new: true }
  );
  console.log(product.name, product.likes);
  res.send(product.likes);
};

exports.setComment = async (req, res, next) => {
  const { name, email, comment } = req.body;
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).send("you send invalid id , pls try again");
  }
  const product = await Product.findByIdAndUpdate(
    productId,
    {
      $push: {
        comments: {
          comment: {
            name: name,
            email: email,
            comment: comment,
            createdAt: new Date().toISOString(),
          },
        },
      },
    },
    { new: true }
  );
  res.send(product.comments);
};
