const express = require("express");
const router = express.Router();

const {
  createService,
  updateService,
  deleteService,
  getMyServices,
  getServiceCategories,
  getTechniciansByService,
  getAllServices
} = require("../controllers/service.Controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { checkRole } = require("../middleware/role.middleware");

// Services create , update, delete (technician) and view all services
router.post("/", verifyToken, checkRole("technician"), createService);
router.put("/:id", verifyToken, checkRole("technician"), updateService);
router.delete("/:id", verifyToken, checkRole("technician"), deleteService);
router.get("/", verifyToken, checkRole("technician"), getMyServices);
router.get("/all", getAllServices); // For customers to view all services
router.get("/categories", getServiceCategories);
router.get("/:serviceName/technicians", getTechniciansByService);

module.exports = router;
