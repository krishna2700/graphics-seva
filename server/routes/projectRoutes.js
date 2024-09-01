const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect, protectOwner } = require("../config/authMiddleware");

// Routes for projects
router
  .route("/")
  .post(protectOwner, createProject) // Only Owner can create projects
  .get(protect, getProjects); // Any authenticated user can view projects

router
  .route("/:id")
  .get(protect, getProjectById) // Any authenticated user can view a specific project
  .put(protectOwner, updateProject) // Only Owner can update projects
  .delete(protectOwner, deleteProject); // Only Owner can delete projects

module.exports = router;
