const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// Get profile
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update profile
router.patch('/', async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, { 
      new: true,
      upsert: true 
    });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;