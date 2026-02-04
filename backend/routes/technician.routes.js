const router = require("express").Router();
const { 
  getTechnicianProfile, 
  getTechnicianStats, 
  getBookingRequests, 
  getBookingHistory,
  getTechnicianSchedule,
  getReviews,
  acceptBooking,
  declineBooking,
  getMyServices,
  createService,
  updateService,
  deleteService,
  updateServiceStatus,
  migrateMyEarnings
} = require("../controllers/technician.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// All routes require authentication
router.use(verifyToken);

router.get("/profile", getTechnicianProfile);
router.get("/stats", getTechnicianStats);
router.get("/booking-requests", getBookingRequests);
router.get("/schedule", getTechnicianSchedule);
router.get("/booking-history", getBookingHistory);
router.get("/reviews", getReviews);
router.get("/my-services", getMyServices);
router.get("/test", (req, res) => res.json({ message: 'Technician routes working', userId: req.user.userId }));
router.post("/migrate-earnings", migrateMyEarnings); // TEMPORARY
router.post("/services", createService);
router.put("/services/:serviceId", updateService);
router.delete("/services/:serviceId", deleteService);
router.patch("/services/:serviceId/status", updateServiceStatus);
router.patch("/bookings/:bookingId/accept", acceptBooking);
router.patch("/bookings/:bookingId/decline", declineBooking);

module.exports = router;
