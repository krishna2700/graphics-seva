const express = require("express");
const router = express.Router();
const {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
} = require("../controllers/requestController");
const {
  protect,
  protectAdmin,
  protectOwner,
} = require("../config/authMiddleware");

// Routes for requests
router
  .route("/")
  .post(protect, createRequest) // Any authenticated user can create a request
  .get(protect, getRequests); // Any authenticated user can view requests

router
  .route("/:id")
  .get(protect, getRequestById) // Any authenticated user can view a specific request
  .put(protectAdmin, updateRequest) // Only Admin can update requests
  .delete(protectAdmin, deleteRequest); // Only Admin can delete requests

module.exports = router;
