const mongoose = require('mongoose');

const VibeSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  song: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Vibe', VibeSchema);
