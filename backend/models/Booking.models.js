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
      default: null,
    },

    deviceType: {
      type: String,
      required: true,
      trim: true,
    },

    issueDescription: {
      type: String,
      required: true,
      trim: true,
    },

    serviceAddress: {
      type: String,
      required: true,
    },

    preferredTimeSlot: {
      type: String,
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "in-progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
