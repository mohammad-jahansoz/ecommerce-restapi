require("winston-mongodb");
require("express-async-errors");
require("./startup/db")();
const express = require("express");
const app = express();
const cors = require("cors");
const adminRoutes = require("./routes/admin");
const Product = require("./models/product");
const productsRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const checkUser = require("./middleware/checkUser");
const error = require("./middleware/error");

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use(checkUser);
app.use(productsRoutes);
app.use(authRoutes);
app.use(error);

app.get("/", async (req, res) => {
  const products = await Product.find();
  res.status(200).send(products);
});

app.use("/admin", adminRoutes);

app.use((req, res, next) => {
  res.status(404).send("mistake url . 404 page not found");
});

app.listen(3000, () => {
  console.log("app running on port 3000");
});
