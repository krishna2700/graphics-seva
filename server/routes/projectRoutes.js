const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Project = require("../models/Project");
const User = require("../models/User");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Create a new project
router.post("/", upload.array("images"), async (req, res) => {
  try {
    const { name, description, assignedTo } = req.body;
    const images = req.files.map((file) => file.path.replace(/\\/g, "/")); // Ensure paths are correctly formatted

    const user = await User.findById(assignedTo);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const project = new Project({ name, description, images, assignedTo });
    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate("assignedTo");
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "assignedTo"
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update project images
router.put("/:id/images", upload.array("images"), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const images = req.files.map((file) => file.path.replace(/\\/g, "/")); // Ensure paths are correctly formatted

    project.images.push(...images);
    await project.save();

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
