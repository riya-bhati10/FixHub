const express = require("express");
const router = express.Router();

const {
  createService,
  updateService,
  deleteService,
  getMyServices,
  getServiceCategories,
  getTechniciansByService,
  getAllServices,
  getServicesByCategory
} = require("../controllers/service.Controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { checkRole } = require("../middleware/role.middleware");
const { checkBlocked } = require("../middleware/block.middleware");


// Services create , update, delete (technician) and view all services
router.post("/", verifyToken, checkBlocked, checkRole("technician"), createService);
router.put("/:id", verifyToken, checkBlocked, checkRole("technician"), updateService);
router.delete("/:id", verifyToken, checkBlocked, checkRole("technician"), deleteService);
router.get("/", verifyToken, checkRole("technician"), getMyServices);
router.get("/all", getAllServices); // For customers to view all services
router.get("/categories", getServiceCategories);
router.get("/category/:categoryId", getServicesByCategory); // Get services by category - MUST be before /:serviceName
router.get("/:serviceName/technicians", getTechniciansByService);

module.exports = router;
