const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  adminCut: {
    type: Number,
    required: true
  },
  technicianAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Earning || mongoose.model('Earning', earningSchema);