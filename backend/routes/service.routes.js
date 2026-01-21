const express = require("express");
const router = express.Router();

const {
  createService,
  updateService,
  deleteService,
} = require("../controllers/service.Controller");
const auth = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

// create
router.post("/", auth, authorizeRoles("technician"), createService);

// Update
router.put("/:id", auth, authorizeRoles("technician"), updateService);

// Delete 
router.delete("/:id", auth, authorizeRoles("technician"), deleteService);

module.exports = router;
