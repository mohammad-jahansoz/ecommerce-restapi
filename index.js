const express = require("express");
const app = express();
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin");
const Product = require("./models/product");
const cors = require("cors");
const productsRoutes = require("./routes/products");
app.use(cors());
app.use(express.json());

try {
  mongoose.connect("mongodb://127.0.0.1:27017/shop-db");
} catch (err) {
  console.log(err);
}

app.use(productsRoutes);

app.get("/", async (req, res, next) => {
  const products = await Product.find();
  res.status(200).send(products);
});

app.use("/admin", adminRoutes);

app.listen(3000, () => {
  console.log("app running on port 3000");
});
