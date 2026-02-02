const router = require("express").Router();
const { verifyToken } = require("../middleware/auth.middleware");
const { checkRole } = require("../middleware/role.middleware");
const { checkBlocked } = require("../middleware/block.middleware");

const {
  createReview,
  getTechnicianReviews,

} = require("../controllers/review.Controller");

router.post("/", verifyToken, checkBlocked, checkRole("customer"), createReview);

router.get("/technician/:technicianId", getTechnicianReviews);

module.exports = router;
