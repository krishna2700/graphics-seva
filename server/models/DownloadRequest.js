const mongoose = require("mongoose");

const downloadRequestSchema = new mongoose.Schema({
  imageUrl: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "approved", "denied"],
    default: "pending",
  },
});

const DownloadRequest = mongoose.model(
  "DownloadRequest",
  downloadRequestSchema
);

module.exports = DownloadRequest;
