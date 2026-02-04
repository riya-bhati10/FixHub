const router = require("express").Router();
const { verifyToken } = require("../middleware/auth.middleware");
const { checkRole } = require("../middleware/role.middleware");
const {
  getDashboardStats,
  getBlockedTechnicians,
  getBlockedCustomers,
  getAllTechnicians,
  getAllCustomers,
  blockUnblockUser,
  getTechnicianServices,
  getServiceReviews,
  getUserBookingHistory,
  getCompletedBookings,
  getChartData
} = require("../controllers/admin.controller");

const adminOnly = [verifyToken, checkRole("admin")];

// Dashboard Routes
router.get("/dashboard/stats", adminOnly, getDashboardStats);
router.get("/blocked-customers", adminOnly, getBlockedCustomers);
router.get("/blocked-technicians", adminOnly, getBlockedTechnicians);


// Technician Routes
router.get("/technicians", adminOnly, getAllTechnicians);
router.get("/technicians/:technicianId/services", adminOnly, getTechnicianServices);

// Customer Routes
router.get("/customers", adminOnly, getAllCustomers);

// User Management
router.patch("/users/:userId/block", adminOnly, blockUnblockUser);
router.get("/users/:userId/history", adminOnly, getUserBookingHistory);

// Service & Review Routes
router.get("/services/:serviceId/reviews", adminOnly, getServiceReviews);

// Earnings Route
router.get("/earnings", adminOnly, getCompletedBookings);

// Chart Data Route
router.get("/chart-data", adminOnly, getChartData);

module.exports = router;