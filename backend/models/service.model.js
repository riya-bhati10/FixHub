const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    technicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    serviceName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    image: {
      type: String,
    },

    serviceCharge: {
      type: Number,
      required: true,
    },

    experience: {
      type: Number, // years
      default: 0,
    },

    completedJobs: {
      type: Number,
      default: 0,
    },
    
    isActive: {
      type: Boolean,
      default: true,
    },
  },

  { timestamps: true },
);

module.exports = mongoose.models.Service || mongoose.model("Service", serviceSchema);