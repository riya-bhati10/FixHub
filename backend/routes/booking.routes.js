const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");
const { createBooking } = require("../controllers/booking.Controller");

router.post(
  "/",
  auth,
  authorizeRoles("customer"),
  createBooking,
);

module.exports = router;
