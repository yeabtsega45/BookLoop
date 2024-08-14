const verifyToken = require("../middlewares/verifyToken");
const Book = require("../models/Book");
const bookController = require("express").Router();
const multer = require("multer");

// image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

// get all books
bookController.get("/getall", async (req, res) => {
  try {
    const books = await Book.find({}).populate("currentOwner", "email");

    // console.log(books);

    return res.status(200).json(books);
  } catch (error) {
    console.error(error);
  }
});

// get all books of the current user
bookController.get("/user", verifyToken, async (req, res) => {
  try {
    const userBooks = await Book.find({ currentOwner: req.user.id });
    return res.status(200).json(userBooks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// get a single book
bookController.get("/get/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "currentOwner",
      "-password"
    );

    if (!book) {
      throw new Error("No such book with that id");
    } else {
      return res.status(200).json(book);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

// create book
bookController.post(
  "/create",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      // console.log(req.body);
      // console.log(req.files);
      const newBook = await Book.create({
        bookNo: req.body.bookNo,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        quantity: req.body.quantity,
        status: req.body.status,
        price: req.body.price,
        image: req.file ? req.file.filename : null,
        currentOwner: req.user.id,
      });

      return res.status(201).json(newBook);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

// update book
bookController.put(
  "/update/:id",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (book.currentOwner.toString() !== req.user.id) {
        throw new Error("You are not allowed to update other people's books");
      }

      const updatedData = {
        bookNo: req.body.bookNo,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        quantity: req.body.quantity,
        status: req.body.status,
        price: req.body.price,
        currentOwner: req.user.id,
      };

      if (req.file) {
        updatedData.image = req.file.filename;
      }

      const updatedProperty = await Book.findByIdAndUpdate(
        req.params.id,
        { $set: updatedData },
        { new: true }
      );

      return res.status(200).json(updatedProperty);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

// delete book
bookController.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book.currentOwner.toString() !== req.user.id) {
      throw new Error("You are not allowed to delete other people books");
    }

    await book.deleteOne();

    return res.status(200).json({ msg: "Successfully deleted book" });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = bookController;
