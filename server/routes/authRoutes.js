const express = require("express");
const router = express.Router();

const User = require("../models/User");

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login Email:", email);

    const user = await User.findOne({ email });

    console.log("User Found:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
      message: "Login Successful",
      token: "sample_token",
      user,
    });
  } catch (error) {
    console.log("Login Error:", error);

    res.status(500).json({
      message: "Login Failed",
    });
  }
});

module.exports = router;