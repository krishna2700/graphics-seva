// models/Album.js
const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  // Add other fields as needed
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
