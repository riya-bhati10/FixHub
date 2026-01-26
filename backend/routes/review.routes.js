const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");
const { createReview } = require("../controllers/review.controller");

router.post("/", auth, authorizeRoles("customer"), createReview);

module.exports = router;
