const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        trim: true
      },
      lastname: {
        type: String,
        trim: true
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["customer", "technician","admin"],
      default: "customer",
    },

    location: {
      type: String,
      required: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    totalEarnings: {
      type: Number,
      default: 0,
    },

  },
  { timestamps: true },
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
