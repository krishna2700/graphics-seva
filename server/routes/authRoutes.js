const express = require("express");
const { authUser, logoutUser } = require("../controllers/authController");

const router = express.Router();

router.post("/login", authUser);
router.post("/logout", logoutUser);

module.exports = router;
