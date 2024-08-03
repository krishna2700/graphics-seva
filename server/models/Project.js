const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [String],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Ensure this matches your User model name
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
