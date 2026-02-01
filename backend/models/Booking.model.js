const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  preferredDate: {
    type: Date,
    required: true
  },
  preferredTime: {
    type: String,
    required: true
  },
  estimatedPrice: {
    type: Number,
    required: true
  },
  actualPrice: {
    type: Number
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    type: String
  },
  acceptedAt: Date,
  declinedAt: Date,
  completedAt: Date,
  cancelledAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);