const express = require("express");
const router = express.Router();

const { createService } = require("../controllers/service.Controller");
const auth = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

router.post("/", auth, authorizeRoles
    ("technician"), createService);

module.exports = router;
