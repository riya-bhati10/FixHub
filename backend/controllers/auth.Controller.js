const User = require("../models/User.Model");
const Technician = require("../models/Technician.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

exports.signup = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      role,
      // technician-only
      expertise,
      experience,
      location,
    } = req.body;

   
    if (!firstname || !email || !password || !phone) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const user = await User.create({
      fullname: { firstname, lastname },
      email,
      password: hashedPassword,
      phone,
      role, 
    });

    // only for the  technician
    if (role === "technician") {
      if (!expertise || !location || !experience) {
        return res.status(400).json({
          message: "Technician details are required",
        });
      }

      await Technician.create({
        userId: user._id,
        expertise,
        experience,
        location,
      });
    }

    return res.status(201).json({
      message: "Registration successful",
      role: user.role,
      userId: user._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


// user login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
