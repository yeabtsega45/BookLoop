const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectDb");
const authController = require("./controllers/authController");
const bookController = require("./controllers/bookController");

const app = express();
connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    // origin: ["https://bookrent.onrender.com"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/images", express.static("public/images"));

app.use("/auth", authController);
app.use("/book", bookController);

app.listen(process.env.PORT, () =>
  console.log("server has been started successfully!")
);
