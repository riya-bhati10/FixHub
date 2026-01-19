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
      ref: "Technician",
      default: null,
    },

    deviceType: {
      type: String,
      enum: ["Mobile", "Laptop", "Desktop", "Tablet"],
      required: true,
    },

    issue: {
      type: String,
      required: true,
    },

    serviceLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    preferredTimeSlot: {
      date: Date,
      time: String,
      enum: ["9AM-12PM", "12PM-3PM", "3PM-6PM", "6PM-9PM"],
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "in_progress", "completed", "cancelled"],
      default: "pending",
    },

    serviceCost: Number,
    acceptedAt: Date,
    completedAt: Date,
    cancelledAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
