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
        lastname: fullname.lastname || ''
      },
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      role: role || "customer",
      location,
    });

    // Generate token for automatic login after signup
    const token = generateToken({
      userId: user._id,
      role: user.role,
    });

    return res.status(201).json({
      message: "Registration successful",
      token,
      userId: user._id,
      role: user.role,
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        phone: user.phone,
        location: user.location,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password: '***' });

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return res.status(403).json({ 
        message: "Your account is blocked. Contact admin for assistance.",
        isBlocked: true 
      });
    }

    const isMatch = await comparePassword(password, user.password);
    console.log('Password match:', isMatch);
    console.log('Stored hash:', user.password.substring(0, 30) + '...');
    
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
    console.error('Login error:', err);
    res.status(500).json({ message: err.message });
  }
};

// user profile
module.exports.getUserProfile = async(req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      phone: user.phone,
      location: user.location,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

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
    const { fullname, phone, location } = req.body;
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
    if (location !== undefined) {
      user.location = location;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        location: user.location,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TEMPORARY: Reset password endpoint (REMOVE IN PRODUCTION)
exports.resetPasswordTemp = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    
    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    res.json({
      message: "Password reset successfully",
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};