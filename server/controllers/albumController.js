const asyncHandler = require("express-async-handler");
const Album = require("../models/Album");

// @desc    Create a new album
// @route   POST /api/albums
// @access  Private (Admin/Owner)
const createAlbum = asyncHandler(async (req, res) => {
  const { name, date, privacy } = req.body;

  const album = new Album({
    name,
    date,
    privacy,
    createdBy: req.user._id,
  });

  const createdAlbum = await album.save();
  res.status(201).json(createdAlbum);
});

// @desc    Get all albums
// @route   GET /api/albums
// @access  Private (Admin/Owner)
const getAlbums = asyncHandler(async (req, res) => {
  const albums = await Album.find({ createdBy: req.user._id });
  res.json(albums);
});

// @desc    Get album by ID
// @route   GET /api/albums/:id
// @access  Private (Admin/Owner)
const getAlbumById = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.id);

  if (album) {
    res.json(album);
  } else {
    res.status(404);
    throw new Error("Album not found");
  }
});

// @desc    Update album
// @route   PUT /api/albums/:id
// @access  Private (Admin/Owner)
const updateAlbum = asyncHandler(async (req, res) => {
  const { name, date, privacy } = req.body;

  const album = await Album.findById(req.params.id);

  if (album) {
    album.name = name || album.name;
    album.date = date || album.date;
    album.privacy = privacy || album.privacy;

    const updatedAlbum = await album.save();
    res.json(updatedAlbum);
  } else {
    res.status(404);
    throw new Error("Album not found");
  }
});

// @desc    Delete album
// @route   DELETE /api/albums/:id
// @access  Private (Admin/Owner)
const deleteAlbum = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.id);

  if (album) {
    await album.remove();
    res.json({ message: "Album removed" });
  } else {
    res.status(404);
    throw new Error("Album not found");
  }
});

module.exports = {
  createAlbum,
  getAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
};
