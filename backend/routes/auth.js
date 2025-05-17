const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require('express-validator');
const User = require("../models/User");

const router = express.Router();

// Register route
router.post(
  "/register",
  [
    check('username').trim().notEmpty().withMessage('Username is required'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Login route
const jwt = require("jsonwebtoken");
router.post(
  "/login",
  [
    check('username').trim().notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET || "dev_secret_key",
      );
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
