const router = require("express").Router();
const { auth } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");
const {
  createBooking,
  getTechnicianBookings, acceptBooking,
  cancelBooking
} = require("../controllers/booking.Controller");

router.post("/", auth, authorizeRoles("customer"), createBooking);

router.get(
  "/technician",
  auth,
  authorizeRoles("technician"),
  getTechnicianBookings,
);

router.post(
  "/:id/accept",
  auth,
  authorizeRoles("technician"),
 acceptBooking,
);

router.post(
  "/:id/cancel",
  auth,
  authorizeRoles("technician"),
  cancelBooking,
);

module.exports = router;
