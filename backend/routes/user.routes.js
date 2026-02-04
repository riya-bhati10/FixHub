const router = require("express").Router();
const { verifyToken } = require("../middleware/auth.middleware");
const { getUserProfile } = require("../controllers/user.Controller");

router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
