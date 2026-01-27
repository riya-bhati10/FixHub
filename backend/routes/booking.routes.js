const router = require("express").Router();
const { auth } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");
const {
  createBooking,
  getTechnicianBookings,
  acceptBooking,
  cancelBooking,
  updateBookingStatus,
  getCustomerBookings,
} = require("../controllers/booking.Controller");

router.post("/", auth, authorizeRoles("customer"), createBooking);

router.get(
  "/technician",
  auth,
  authorizeRoles("technician"),
  getTechnicianBookings,
);

router.patch("/:id/accept", auth, authorizeRoles("technician"), acceptBooking);

router.patch(
  "/:id/cancel",
  auth,
  authorizeRoles("technician", "customer"),
  cancelBooking,
);

router.patch("/:id/status", auth, authorizeRoles("technician"), updateBookingStatus);

router.get("/customer", auth, authorizeRoles("customer"), getCustomerBookings);

module.exports = router;
