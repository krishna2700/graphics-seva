const User = require("../models/User");
const Project = require("../models/Project");
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newAdmin = new User({
      name,
      email,
      password,
      role: "Admin",
    });

    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "Admin" });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAdminDetails = async (req, res) => {
  try {
    const adminId = req.params.id;

    // Find the admin by ID
    const admin = await User.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Fetch projects assigned to this admin
    const projects = await Project.find({ assignedTo: adminId });

    // Respond with the admin details and their assigned projects
    res.status(200).json({
      admin,
      projects,
    });
  } catch (error) {
    console.error("Error fetching admin details:", error);
    res.status(500).json({ message: "Error fetching admin details" });
  }
};
