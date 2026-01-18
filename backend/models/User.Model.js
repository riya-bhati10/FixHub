const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
        trim: true,
      },
      lastname: {
        type: String,
        minlength: [3, "Last name must be at least 3 characters long"],
        trim: true,
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: [5, "Email must be at least 5 characters long"],
    },

    password: {
      type: String,
      required: true,
      select: false, // by default password query me nahi aayega
    },

    phone: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "technician","admin"],
      default: "customer",
    },

    // 👉 Only for technician
    expertise: {
      type: [String],
      default: [],
    },

    availabilityStatus: {
      type: String,
      enum: ["available",  "offline"],
      default: "offline",
    },
  },
  { timestamps: true }
);

const userModel= mongoose.model('User',userSchema)

module.exports= userModel;