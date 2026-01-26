const express = require("express");
const router = express.Router();

const {
  createService,
  updateService,
  deleteService,
  getMyServices,
} = require("../controllers/service.Controller");
const auth = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");


// Services create , update, delete (technician) and view all services
router.post("/", auth, authorizeRoles("technician"), createService);
router.put("/:id", auth, authorizeRoles("technician"), updateService);
router.delete("/:id", auth, authorizeRoles("technician"), deleteService);
router.get("/", auth, authorizeRoles("technician"), getMyServices);


module.exports = router;
