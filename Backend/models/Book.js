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
    },
    author: {
      type: String,
    },
    category: {
      type: String,
      enum: ["fiction", "self help", "business"],
    },
    quantity: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Free", "Rented"],
      default: "Free",
    },
    price: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
