const router = require("express").Router();
const { signup, login, logoutUser, getCurrentUser, updateProfile } = require("../controllers/auth.Controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", verifyToken, logoutUser);
router.get("/me", verifyToken, getCurrentUser);
router.put("/update-profile", verifyToken, updateProfile);

module.exports = router;
