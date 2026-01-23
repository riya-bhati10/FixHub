const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");
const {
  createBooking,
  getTechnicianBookings,
} = require("../controllers/booking.Controller");

router.post("/", auth, authorizeRoles("customer"), createBooking);

router.get(
  "/technician",
  auth,
  authorizeRoles("technician"),
  getTechnicianBookings,
);

module.exports = router;
