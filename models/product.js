const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      minLength: 5,
      maxLength: 255,
      trim: true,
    },
    imageUrl: {
      type: String,
      default:
        "https://apollobattery.com.au/wp-content/uploads/2022/08/default-product-image.png",
    },
    count: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    relatedProduct: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          imageUrl: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
          _id: false,
        },
      ],
      default: [],
    },
    comments: {
      type: [
        {
          comment: {
            name: {
              type: String,
              required: true,
            },
            email: {
              type: String,
              required: true,
            },
            comment: {
              type: String,
              required: true,
            },
            createdAt: {
              type: Date,
              default: new Date().toISOString(),
            },
          },
          reply: {
            reply: String,
          },
        },
      ],
      default: [],
    },
    likes: {
      type: [Date],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ name: "text", category: "text" });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
