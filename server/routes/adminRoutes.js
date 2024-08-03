const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/", adminController.createAdmin);
router.get("/", adminController.getAdmins);
router.get("/:id/details", adminController.getAdminDetails);

module.exports = router;
