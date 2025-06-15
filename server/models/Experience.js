const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  position: { type: String, required: true },
  institution: { type: String, required: true },
  duration: { type: String, required: true },
  description: [String],
  current: { type: Boolean, default: false }
});

module.exports = mongoose.model('Experience', experienceSchema);