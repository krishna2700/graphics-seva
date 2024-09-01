const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  logoutUser,
} = require("../controllers/authController");
const { protect } = require("../config/authMiddleware");

router.post("/login", authUser);
router.post("/register", protect, registerUser);
router.post("/logout", logoutUser);

module.exports = router;
