const express = require('express');
const { getVibes, createVibe } = require('../controllers/vibeController');
const protect = require('../middleware/auth');
const router = express.Router();

router.get('/', getVibes);
router.post('/', protect, createVibe);

module.exports = router;
