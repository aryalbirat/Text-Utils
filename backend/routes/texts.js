const express = require('express');
const { check, validationResult } = require('express-validator');
const authenticateToken = require('../middleware/auth');
const Text = require('../models/Text');

const router = express.Router();

// Create text
router.post(
  '/',
  authenticateToken,
  [check('content').trim().notEmpty().withMessage('Content is required')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const newText = new Text({ content: req.body.content, userId: req.user.userId });
      await newText.save();
      res.status(201).json(newText);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get all texts for user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const texts = await Text.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(texts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update text
router.put(
  '/:id',
  authenticateToken,
  [check('content').trim().notEmpty().withMessage('Content is required')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const updated = await Text.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.userId },
        { content: req.body.content },
        { new: true }
      );
      if (!updated) return res.status(404).json({ message: 'Text not found or unauthorized' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete text
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deleted = await Text.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!deleted) return res.status(404).json({ message: 'Text not found or unauthorized' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
