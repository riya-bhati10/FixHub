const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  getMyNotifications,
} = require("../controllers/notification.controller");

router.get("/", auth, getMyNotifications);

module.exports = router;
