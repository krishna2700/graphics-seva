const express = require("express");
const router = express.Router();
const {
  createAlbum,
  getAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/albumController");
const {
  protect,
  protectAdmin,
  protectOwner,
} = require("../config/authMiddleware");

// Routes for albums
router
  .route("/")
  .post(protect, createAlbum) // Any authenticated user can create an album
  .get(protect, getAlbums); // Any authenticated user can view albums

router
  .route("/:id")
  .get(protect, getAlbumById) // Any authenticated user can view a specific album
  .put(protectAdmin, updateAlbum) // Only Admin can update albums
  .delete(protectAdmin, deleteAlbum); // Only Admin can delete albums

module.exports = router;
