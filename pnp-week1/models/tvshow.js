const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tvshowSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("TvShow", tvshowSchema);
