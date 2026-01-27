const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");
const {
  createReview,
  getTechnicianReviews,
} = require("../controllers/review.controller");

router.post("/", auth, authorizeRoles("customer"), createReview);

router.get("/technician/:technicianId", getTechnicianReviews);

module.exports = router;
