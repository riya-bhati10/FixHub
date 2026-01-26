const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  getMyNotifications, markAsRead, getUnreadCount
} = require("../controllers/notification.controller");

router.get("/", auth, getMyNotifications);
router.patch("/:id/read", auth, markAsRead);
router.get("/unread-count", auth, getUnreadCount);


module.exports = router;
