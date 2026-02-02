const router = require("express").Router();
const { verifyToken } = require("../middleware/auth.middleware");
const { checkRole } = require("../middleware/role.middleware");
const { checkBlocked } = require("../middleware/block.middleware");


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


router.post("/", verifyToken,checkBlocked, checkRole("customer"), createBooking);

router.get(
  "/technician",
  verifyToken,
  checkRole("technician"),
  getTechnicianBookings,
);

router.patch("/:id/accept", verifyToken, checkBlocked ,checkRole("technician"), acceptBooking);

router.patch(
  "/:id/cancel",
  verifyToken,
  checkBlocked,
  checkRole("technician", "customer"),
  cancelBooking,
);

router.patch("/:id/status", verifyToken, checkRole("technician"), updateBookingStatus);

router.post("/:id/verify-otp", verifyToken, checkRole("technician"), verifyCompletionOTP);

router.post("/:id/resend-otp", verifyToken, checkRole("technician"), resendCompletionOTP);

router.get("/customer", verifyToken, checkRole("customer"), getCustomerBookings);
module.exports = router;
