const router = require("express").Router();
const { signup, login, logoutUser, getUserProfile } = require("../controllers/auth.Controller");
const { auth } = require("../middleware/auth.middleware");

router.post("/signup", signup);
router.post("/login", login);

router.get("/profile", auth, getUserProfile);//protected route 
router.get("/logout", auth, logoutUser)  //onley authenticated users can logout

module.exports = router;
