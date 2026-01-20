const mongoose = require("mongoose");

const technicianSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    expertise: {
      type: [String],
      required: true,
    },

    experience: {
      type: Number,
      default: 0,
    },

    services: [
      {
        name: String,
        description: String,
        image: String,
        serviceCharge: Number,
      },
    ],
    completedJobs: {
      type: Number,
      default: 0,
    },
    
    averageRating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Technician", technicianSchema);
