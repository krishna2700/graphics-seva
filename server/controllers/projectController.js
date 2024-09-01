const asyncHandler = require("express-async-handler");
const Project = require("../models/Project");
const User = require("../models/User");

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Admin/Owner)
const createProject = asyncHandler(async (req, res) => {
  const { name, date, assignedTo } = req.body;

  const user = await User.findById(assignedTo);

  if (!user) {
    res.status(400);
    throw new Error("Assigned user not found");
  }

  const project = new Project({
    name,
    date,
    assignedTo: user._id,
    createdBy: req.user._id,
  });

  const createdProject = await project.save();
  res.status(201).json(createdProject);
});

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private (Admin/Owner)
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().populate("assignedTo", "name email");
  res.json(projects);
});

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Private (Admin/Owner)
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate(
    "assignedTo",
    "name email"
  );

  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin/Owner)
const updateProject = asyncHandler(async (req, res) => {
  const { name, date, assignedTo } = req.body;

  const project = await Project.findById(req.params.id);

  if (project) {
    project.name = name || project.name;
    project.date = date || project.date;
    project.assignedTo = assignedTo || project.assignedTo;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin/Owner)
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    await project.remove();
    res.json({ message: "Project removed" });
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

// @desc    Get projects assigned to the logged-in admin
// @route   GET /api/admin/projects
// @access  Private (Admin)
const getAdminProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ assignedTo: req.user._id });
  res.json(projects);
});

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getAdminProjects,
};
