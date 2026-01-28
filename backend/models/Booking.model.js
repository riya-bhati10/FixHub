const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    technicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    issue: {
      type: String,
      required: true,
    },

    serviceDate: {
      type: Date,
      required: true,
    },

    timeSlot: {
      type: String,
      enum: ["9AM-12PM", "12PM-3PM", "3PM-6PM", "6PM-9PM"],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "in_progress", "completed", "cancelled"],
      default: "pending",
    },

    serviceLocation: {
      type: String,
      required: false,
    },
    statusHistory: [
      {
        status: String,
        updatedAt: Date,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
