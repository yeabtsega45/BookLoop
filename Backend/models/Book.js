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
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
