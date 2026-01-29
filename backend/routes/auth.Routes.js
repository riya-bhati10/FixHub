const router = require("express").Router();
const { signup, login, logoutUser } = require("../controllers/auth.Controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", verifyToken, logoutUser);

module.exports = router;
