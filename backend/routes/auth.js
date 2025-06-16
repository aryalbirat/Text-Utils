const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require('express-validator');
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Register route
router.post(
  "/register",
  [
    check('username').trim().notEmpty().withMessage('Username is required'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  async (req, res) => {
    try {
      console.log('Registration attempt:', { username: req.body.username });
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, password } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        console.log('Username already exists:', username);
        return res.status(400).json({ message: "Username already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create new user
      const user = new User({ username, password: hashedPassword });
      console.log('Attempting to save new user:', { username });
      
      await user.save();
      console.log('User saved successfully:', { username });

      // Generate JWT
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET || "dev_secret_key",
        { expiresIn: '24h' }
      );

      res.status(201).json({ message: "User registered successfully", token });
    } catch (err) {
      console.error('Registration error details:', {
        error: err.message,
        stack: err.stack,
        code: err.code
      });
      res.status(500).json({ 
        message: "Server error during registration",
        error: err.message 
      });
    }
  }
);

// Login route
router.post(
  "/login",
  [
    check('username').trim().notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, password } = req.body;

      // Find user
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET || "dev_secret_key",
        { expiresIn: '24h' }
      );

      res.json({ token });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: "Server error during login" });
    }
  }
);

module.exports = router;
