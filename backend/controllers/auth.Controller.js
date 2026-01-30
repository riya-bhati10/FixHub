const User = require("../models/User.model");
const blackListTokenModel = require("../models/blacklistToken.model");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../utils/auth.utils");


exports.signup = async (req, res) => {
  try {
    const { fullname, email, password, phone, role, location } =
      req.body;
  

    if (!fullname.firstname || !email || !password || !phone) {

      return res.status(400).json({ message: "Required fields missing" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname
      },
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      role: role || "customer",
      location,
    });


    return res.status(201).json({
      message: "Registration successful",
      token: generateToken({ userId: user._id, role: user.role }),
      role: user.role,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// user LogOut
module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie('token')
    const authHeader = req.headers.authorization;
    const token = req.cookies?.token || (authHeader && authHeader.startsWith('Bearer') ? authHeader.replace('Bearer', '').trim() : null);
    console.log(token);
    
    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }
    await blackListTokenModel.create({ token })

    res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { fullname, phone } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (fullname) {
      user.fullname = fullname;
    }
    if (phone) {
      user.phone = phone;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};