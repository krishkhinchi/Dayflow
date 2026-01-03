const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  leave_type: {
    type: String,
    required: true,
    enum: ['paid', 'sick', 'unpaid']
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  days: {
    type: Number,
    required: true,
    min: 1
  },
  reason: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  admin_comment: {
    type: String,
    trim: true
  },
  reviewed_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewed_at: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);
