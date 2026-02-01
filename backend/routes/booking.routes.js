const router = require("express").Router();
const { verifyToken } = require("../middleware/auth.middleware");
const { checkRole } = require("../middleware/role.middleware");
const {
  createBooking,
  getTechnicianBookings,
  acceptBooking,
  cancelBooking,
  updateBookingStatus,
  getCustomerBookings,
} = require("../controllers/booking.Controller");
const { checkBlocked } = require("../middleware/block.middleware");


router.post("/", verifyToken, checkBlocked,checkRole("customer"), createBooking);

router.get(
  "/technician",
  verifyToken,
  checkRole("technician"),
  getTechnicianBookings,
);

router.patch("/:id/accept", verifyToken,checkBlocked, checkRole("technician"), acceptBooking);

router.patch(
  "/:id/cancel",
  verifyToken,checkBlocked,
  checkRole("technician", "customer"),
  cancelBooking,
);

router.patch("/:id/status", verifyToken, checkRole("technician"), updateBookingStatus);

router.get("/customer", verifyToken, checkRole("customer"), getCustomerBookings);

module.exports = router;
