const express = require('express');
const { register, login } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Register new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get current user profile (protected route)
router.get('/profile', authenticateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
