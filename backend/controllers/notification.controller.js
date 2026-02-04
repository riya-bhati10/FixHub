const Notification = require("../models/Notification.model");

exports.getMyNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log('Fetching notifications for user:', userId);

    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });

    console.log('Found notifications:', notifications.length);
    console.log('Notifications:', JSON.stringify(notifications, null, 2));

    res.json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.getTechnicianNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;

    const notifications = await Notification.find({ 
      $or: [
        { userId },
        { recipient: 'technician' },
        { recipient: 'all' }
      ]
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    console.error('Error fetching technician notifications:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const userId = req.user.userId;
    const notificationId = req.params.id;

    const notification = await Notification.findOne({
      _id: notificationId,
      userId,
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.read = true;
    await notification.save();

    res.json({ message: "Notification marked as read" });
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.userId;

    await Notification.updateMany(
      { userId, read: false },
      { read: true }
    );

    res.json({ message: "All notifications marked as read" });
  } catch (err) {
    console.error('Error marking all notifications as read:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.userId;

    const unreadCount = await Notification.countDocuments({
      userId,
      read: false,
    });

    res.json({ unreadCount });
  } catch (err) {
    console.error('Error getting unread count:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.clearAllNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;

    await Notification.deleteMany({ userId });

    res.json({ message: "All notifications cleared" });
  } catch (err) {
    console.error('Error clearing all notifications:', err);
    res.status(500).json({ message: err.message });
  }
};
