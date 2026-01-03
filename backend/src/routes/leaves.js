const express = require('express');
const {
  getLeaveRequests,
  createLeaveRequest,
  updateLeaveRequest,
  getLeaveBalance,
  updateLeaveBalance
} = require('../controllers/leaveController');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all leave requests (admin sees all, employee sees own)
router.get('/', authenticateToken, getLeaveRequests);

// Create new leave request
router.post('/', authenticateToken, createLeaveRequest);

// Update leave request status (admin only)
router.put('/:id', authenticateToken, requireRole('admin'), updateLeaveRequest);

// Get leave balance for a user
router.get('/balance/:userId?', authenticateToken, getLeaveBalance);

// Update leave balance (admin only)
router.put('/balance/:userId', authenticateToken, requireRole('admin'), updateLeaveBalance);

module.exports = router;
