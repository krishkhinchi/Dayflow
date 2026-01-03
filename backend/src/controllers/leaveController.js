const LeaveRequest = require('../models/LeaveRequest');
const LeaveBalance = require('../models/LeaveBalance');
const User = require('../models/User');

const getLeaveRequests = async (req, res) => {
  try {
    let query = {};

    // Employees can only see their own requests, admins can see all
    if (req.user.role !== 'admin') {
      query.user_id = req.user.id;
    }

    const leaveRequests = await LeaveRequest.find(query)
      .populate('user_id', 'full_name email')
      .populate('reviewed_by', 'full_name')
      .sort({ createdAt: -1 });

    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createLeaveRequest = async (req, res) => {
  try {
    const { leave_type, start_date, end_date, days, reason } = req.body;

    const leaveRequest = new LeaveRequest({
      user_id: req.user.id,
      leave_type,
      start_date,
      end_date,
      days,
      reason
    });

    await leaveRequest.save();

    const populatedRequest = await LeaveRequest.findById(leaveRequest._id)
      .populate('user_id', 'full_name email');

    res.status(201).json(populatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateLeaveRequest = async (req, res) => {
  try {
    const { status, admin_comment } = req.body;
    const requestId = req.params.id;

    const leaveRequest = await LeaveRequest.findById(requestId);
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    // Only admins can approve/reject requests
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    leaveRequest.status = status;
    leaveRequest.admin_comment = admin_comment;
    leaveRequest.reviewed_by = req.user.id;
    leaveRequest.reviewed_at = new Date();

    await leaveRequest.save();

    const populatedRequest = await LeaveRequest.findById(requestId)
      .populate('user_id', 'full_name email')
      .populate('reviewed_by', 'full_name');

    res.json(populatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getLeaveBalance = async (req, res) => {
  try {
    let userId = req.params.userId || req.user.id;

    // Employees can only view their own balance, admins can view anyone's
    if (req.user.role !== 'admin' && userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    let leaveBalance = await LeaveBalance.findOne({ user_id: userId });

    if (!leaveBalance) {
      // Create default balance if not exists
      leaveBalance = new LeaveBalance({
        user_id: userId,
        paid_days: 20,
        sick_days: 10,
        unpaid_days: 0
      });
      await leaveBalance.save();
    }

    res.json(leaveBalance);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateLeaveBalance = async (req, res) => {
  try {
    const { paid_days, sick_days, unpaid_days } = req.body;
    const userId = req.params.userId;

    // Only admins can update leave balances
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const leaveBalance = await LeaveBalance.findOneAndUpdate(
      { user_id: userId },
      { paid_days, sick_days, unpaid_days },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(leaveBalance);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getLeaveRequests,
  createLeaveRequest,
  updateLeaveRequest,
  getLeaveBalance,
  updateLeaveBalance
};
