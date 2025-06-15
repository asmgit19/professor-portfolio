const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// Get all experience entries
router.get('/', async (req, res) => {
  try {
    const experience = await Experience.find().sort('-current');
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new experience entry
router.post('/', async (req, res) => {
  const experience = new Experience({
    position: req.body.position,
    institution: req.body.institution,
    duration: req.body.duration,
    description: req.body.description,
    current: req.body.current || false
  });

  try {
    const newExperience = await experience.save();
    res.status(201).json(newExperience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;