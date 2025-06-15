const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [String],
  journal: String,
  year: { type: Number, required: true },
  doi: String,
  link: String,
  category: { type: String, enum: ['journal', 'conference', 'book'] }
});

module.exports = mongoose.model('Publication', publicationSchema);