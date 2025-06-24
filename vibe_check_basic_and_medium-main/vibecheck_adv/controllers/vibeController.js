const Vibe = require('../models/Vibe');

exports.getVibes = async (req, res) => {
  const vibes = await Vibe.find().populate('user', 'username');
  res.status(200).json(vibes);
};

exports.createVibe = async (req, res) => {
  try {
    const vibe = await Vibe.create({
      mood: req.body.mood,
      song: req.body.song,
      user: req.user.id,
    });
    res.status(201).json(vibe);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
