const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    currentOwner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookNo: {
      type: String,
      default: "6465",
    },
    title: {
      type: String,
      default: "Not Provided",
    },
    author: {
      type: String,
      default: "Not Provided",
    },
    category: {
      type: String,
      enum: ["fiction", "self help", "business", "Not Provided", ""],
      default: "Not Provided",
    },
    quantity: {
      type: String,
      default: "1",
    },
    status: {
      type: String,
      enum: ["Free", "Rented"],
      default: "Free",
    },
    price: {
      type: String,
      default: "Not Provided",
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
