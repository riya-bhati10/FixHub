const Notification = require("../models/Notification.model");

exports.getMyNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;

    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });

    res.json({
      count: notifications.length,
      notifications,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

