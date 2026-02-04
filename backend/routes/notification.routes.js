const router = require("express").Router();
const { verifyToken } = require("../middleware/auth.middleware");
const {
  getMyNotifications, 
  getTechnicianNotifications,
  markAsRead, 
  markAllAsRead,
  getUnreadCount,
  clearAllNotifications
} = require("../controllers/notification.controller");

router.get("/", verifyToken, getMyNotifications);
router.get("/technician", verifyToken, getTechnicianNotifications);
router.patch("/:id/read", verifyToken, markAsRead);
router.patch("/mark-all-read", verifyToken, markAllAsRead);
router.get("/unread-count", verifyToken, getUnreadCount);

router.delete("/clear-all", verifyToken, clearAllNotifications);

module.exports = router;
