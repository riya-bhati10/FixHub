const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ['booking_request', 'booking_accepted', 'booking_completed', 'booking_cancelled', 'review_received', 'payment_processed', 'otp', 'system'],
      default: 'system'
    },

    recipient: {
      type: String,
      enum: ['customer', 'technician', 'all'],
      default: 'all'
    },

    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },

    read: {
      type: Boolean,
      default: false,
    },

    // Keep old field for backward compatibility
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
