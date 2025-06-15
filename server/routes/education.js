const express = require('express');
const router = express.Router();
const Education = require('../models/Education');

// Get all education entries
router.get('/', async (req, res) => {
  try {
    const education = await Education.find().sort('-year');
    res.json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new education entry
router.post('/', async (req, res) => {
  const education = new Education({
    degree: req.body.degree,
    institution: req.body.institution,
    year: req.body.year,
    description: req.body.description
  });

  try {
    const newEducation = await education.save();
    res.status(201).json(newEducation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;