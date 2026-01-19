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
        estimatedPrice: Number,
      },
    ],
    completedJobs: {
      type: Number,
      default: 0,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
    },

    averageRating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Technician", technicianSchema);
