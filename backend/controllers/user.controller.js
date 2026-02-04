const User = require("../models/User.Model");

module.exports.getUserProfile = async (req, res) => {
  try {
    console.log('Getting user profile for userId:', req.user.userId);
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      console.log('User not found for userId:', req.user.userId);
      return res.status(404).json({ message: "User not found" });
    }
    console.log('User found:', user.fullname);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({ message: error.message });
  }
};
