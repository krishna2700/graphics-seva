const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const DownloadRequest = require("../models/DownloadRequest");

const router = express.Router();

// Request to download an image
router.post("/request-download", verifyToken, async (req, res) => {
  const { imageUrl } = req.body;
  const userId = req.user.id;

  try {
    const newRequest = new DownloadRequest({ imageUrl, userId });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: "Failed to create download request" });
  }
});

// Other endpoints (e.g., get all requests, update request)...

// Get all download requests (admin view)
router.get("/requests", verifyToken, async (req, res) => {
  try {
    const requests = await DownloadRequest.find().populate(
      "userId",
      "name email"
    );
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch download requests" });
  }
});

// Approve or deny a download request
router.patch("/requests/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const request = await DownloadRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: "Failed to update download request" });
  }
});

module.exports = router;
