const express = require('express');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticateToken, requireRole('admin'), getAllUsers);

// Get user by ID
router.get('/:id', authenticateToken, getUserById);

// Update user
router.put('/:id', authenticateToken, updateUser);

// Delete user (admin only)
router.delete('/:id', authenticateToken, requireRole('admin'), deleteUser);

module.exports = router;
