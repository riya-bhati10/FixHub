const router = require("express").Router();
const { verifyToken } = require("../middleware/auth.middleware");
const { checkRole } = require("../middleware/role.middleware");
const { checkBlocked, checkBlockedForAcceptedWork } = require("../middleware/block.middleware");


const {
  createBooking,
  getTechnicianBookings,
  acceptBooking,
  cancelBooking,
  updateBookingStatus,
  getCustomerBookings,
  verifyCompletionOTP,
  resendCompletionOTP,
} = require("../controllers/booking.Controller");


router.post("/", verifyToken, checkRole("customer"), createBooking);

router.get(
  "/technician",
  verifyToken,
  checkRole("technician"),
  getTechnicianBookings,
);

router.patch("/:id/accept", verifyToken, checkBlocked, checkRole("technician"), acceptBooking);

router.patch(
  "/:id/cancel",
  verifyToken,
  checkBlocked,
  checkRole("technician", "customer"),
  cancelBooking,
);

router.patch("/:id/status", verifyToken, checkBlockedForAcceptedWork, checkRole("technician"), updateBookingStatus);

router.post("/:id/verify-otp", verifyToken, checkBlockedForAcceptedWork, checkRole("technician"), verifyCompletionOTP);

router.post("/:id/resend-otp", verifyToken, checkBlockedForAcceptedWork, checkRole("technician"), resendCompletionOTP);

router.get("/customer", verifyToken, checkRole("customer"), getCustomerBookings);
module.exports = router;
