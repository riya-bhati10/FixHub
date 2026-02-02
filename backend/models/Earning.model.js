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
    required: true,
    default: function() {
      return this.totalAmount * 0.1; // 10% admin cut
    }
  },
  technicianAmount: {
    type: Number,
    required: true,
    default: function() {
      return this.totalAmount * 0.9; // 90% for technician
    }
  },
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Earning', earningSchema);
