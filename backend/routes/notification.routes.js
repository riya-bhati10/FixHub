const router = require("express").Router();
const { verifyToken } = require("../middleware/auth.middleware");
const {
  getMyNotifications, markAsRead, getUnreadCount
} = require("../controllers/notification.Controller");

router.get("/", verifyToken, getMyNotifications);
router.patch("/:id/read", verifyToken, markAsRead);
router.get("/unread-count", verifyToken, getUnreadCount);


module.exports = router;
