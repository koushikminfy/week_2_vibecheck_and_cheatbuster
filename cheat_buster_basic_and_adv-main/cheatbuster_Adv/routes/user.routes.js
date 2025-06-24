const express = require('express');
const { searchUser, getAllUsers } = require('../controllers/user.controller');

const router = express.Router();

// GET /api/users/search?email=test@example.com
// GET /api/users/search?name=John
router.get('/users/search', searchUser);

// GET /api/users - get all users
router.get('/users', getAllUsers);

module.exports = router;