const User = require("../models/User.model");


const checkBlocked = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account is blocked. Contact admin for assistance.",
        isBlocked: true,
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Special middleware for accepted bookings - allows blocked technicians to complete accepted work
const checkBlockedForAcceptedWork = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    const bookingId = req.params.id;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isBlocked) {
      // Check if this is for an already accepted booking
      const booking = await require("../models/Booking.model").findOne({
        _id: bookingId,
        technician: userId,
        status: { $in: ["accepted", "in-progress", "pending-completion"] }
      });

      if (!booking) {
        return res.status(403).json({
          success: false,
          message: "Your account is blocked. You can only complete already accepted work.",
          isBlocked: true,
        });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { checkBlocked, checkBlockedForAcceptedWork };