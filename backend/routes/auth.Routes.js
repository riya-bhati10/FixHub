const router = require("express").Router();
const { signup, login, logoutUser, getUserProfile } = require("../controllers/auth.Controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/signup", signup);
router.post("/login", login);

router.get("/profile", verifyToken, getUserProfile);//protected route 
router.get("/logout", verifyToken, logoutUser)  //onley authenticated users can logout

module.exports = router;
