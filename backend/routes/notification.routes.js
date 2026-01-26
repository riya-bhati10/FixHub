const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  getMyNotifications,markAsRead
} = require("../controllers/notification.controller");

router.get("/", auth, getMyNotifications);
router.patch("/:id/read", auth, markAsRead);

module.exports = router;
