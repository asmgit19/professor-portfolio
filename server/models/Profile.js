const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  department: String,
  university: String,
  email: { type: String, required: true },
  phone: String,
  address: String,
  about: { type: String, required: true },
  researchInterests: [String],
  imageUrl: String,
  socialLinks: [{
    platform: String,
    url: String,
    iconClass: String
  }]
});

module.exports = mongoose.model('Profile', profileSchema);