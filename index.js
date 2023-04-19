const express = require("express");
const app = express();
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin");
const Product = require("./models/product");
const cors = require("cors");
const productsRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const checkUser = require("./middleware/checkUser");
const asyncMiddleware = require("./middleware/async");

require("dotenv").config();
app.use(cors());
app.use(express.json());

try {
  mongoose.connect("mongodb://127.0.0.1:27017/shop-db");
} catch (err) {
  console.log(err);
}

app.use(checkUser);
app.use(productsRoutes);
app.use(authRoutes);

app.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const products = await Product.find();
    res.status(200).send(products);
  })
);

app.use("/admin", adminRoutes);

app.use((req, res, next) => {
  res.status(404).send("mistake url . 404 page not found");
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send(`error server happen! ${err.message}`);
});

app.listen(3000, () => {
  console.log("app running on port 3000");
});
