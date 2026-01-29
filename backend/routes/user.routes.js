const router = require("express").Router();
const { verifyToken } = require("../middleware/auth.middleware");
const { getUserProfile } = require("../controllers/user.controller");

router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
