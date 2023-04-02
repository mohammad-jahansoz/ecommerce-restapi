const Product = require("../models/product");
exports.getProduct = async (req, res, next) => {
  const productId = req.body.id;
  const product = await Product.findOne(productId);
  if (!product)
    res.status(404).send(`we havent any product with ${productId} id`);

  res.status(200).send(product);
};

exports.setLike = async (req, res, next) => {
  const productId = req.params.id;
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
