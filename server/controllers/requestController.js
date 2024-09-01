const asyncHandler = require("express-async-handler");
const Request = require("../models/Request");

// @desc    Create a new request for image download
// @route   POST /api/requests
// @access  Private (User)
const createRequest = asyncHandler(async (req, res) => {
  const { album, image } = req.body;

  const request = new Request({
    album,
    image,
    requestedBy: req.user._id,
  });

  const createdRequest = await request.save();
  res.status(201).json(createdRequest);
});

// @desc    Get all requests
// @route   GET /api/requests
// @access  Private (Admin/Owner)
const getRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find()
    .populate("album")
    .populate("requestedBy", "name email");
  res.json(requests);
});

// @desc    Get request by ID
// @route   GET /api/requests/:id
// @access  Private (Admin/Owner)
const getRequestById = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id)
    .populate("album")
    .populate("requestedBy", "name email");

  if (request) {
    res.json(request);
  } else {
    res.status(404);
    throw new Error("Request not found");
  }
});

// @desc    Approve or reject request
// @route   PUT /api/requests/:id
// @access  Private (Admin/Owner)
const updateRequest = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const request = await Request.findById(req.params.id);

  if (request) {
    request.status = status;

    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } else {
    res.status(404);
    throw new Error("Request not found");
  }
});

// @desc    Delete request
// @route   DELETE /api/requests/:id
// @access  Private (Admin/Owner)
const deleteRequest = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);

  if (request) {
    await request.remove();
    res.json({ message: "Request removed" });
  } else {
    res.status(404);
    throw new Error("Request not found");
  }
});

module.exports = {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
};
