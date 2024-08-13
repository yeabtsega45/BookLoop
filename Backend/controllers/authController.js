const authController = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");

authController.post("/register", async (req, res) => {
  try {
    const isExisting = await User.findOne({ email: req.body.email });

    if (isExisting) {
      throw new Error("Email is already taken by another user");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const { password, ...others } = newUser._doc;
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    return res.status(201).json({ user: others, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

authController.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Wrong credentials. Try again!");
    }

    const comparePass = await bcrypt.compare(req.body.password, user.password);
    if (!comparePass) {
      throw new Error("Wrong credentials. Try again!");
    }

    const { password, ...others } = user._doc;
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    return res.status(200).json({ user: others, token });
  } catch (error) {
    return res.status(500).json({ error: "Wrong credentials. Try again!" });
  }
});

// Check authorization
authController.get("/verifytoken", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // If the middleware passes, the token is valid
    res.status(200).json({ message: "Token is valid", user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Check user
authController.post("/checkuser", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(200).json({ exists: true });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Error checking user" });
  }
});

// admin login
authController.post("/adminlogin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Wrong credentials. Try again!");
    }

    const comparePass = await bcrypt.compare(req.body.password, user.password);
    if (!comparePass) {
      throw new Error("Wrong credentials. Try again!");
    }

    // Check if the user's role is either "owner" or "admin"
    if (user.role !== "owner" && user.role !== "admin") {
      throw new Error(
        "Unauthorized access. Only owners or admins can use this login."
      );
    }

    // Change the role to "admin" if it was "owner"
    if (user.role === "owner") {
      user.role = "admin";
      await user.save();
    }

    const { password, ...others } = user._doc;
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    return res.status(200).json({ user: others, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = authController;
