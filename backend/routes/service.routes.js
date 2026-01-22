const express = require("express");
const router = express.Router();

const {
  createService,
  updateService,
  deleteService,
} = require("../controllers/service.Controller");
const auth = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");
const { getAllServices } = require("../controllers/service.Controller");


// create
router.post("/", auth, authorizeRoles("technician"), createService);

// Update
router.put("/:id", auth, authorizeRoles("technician"), updateService);

// Delete 
router.delete("/:id", auth, authorizeRoles("technician"), deleteService);

// view all services
router.get("/", getAllServices);


module.exports = router;
