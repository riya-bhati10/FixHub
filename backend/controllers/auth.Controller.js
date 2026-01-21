const User = require("../models/User.Model");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../utils/auth.utils");


exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phone, role, location } =
      req.body;

    if (!firstname || !email || !password || !phone) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      fullname: { firstname, lastname },
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      role: role || "customer",
      location,
    });

    return res.status(201).json({
      message: "Registration successful",
      userId: user._id,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// user login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      userId: user._id,
      role: user.role,
    });

    return res.json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
