const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const maxYear = new Date().getFullYear()

const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    enum: ['Action', 'Drama', 'Comedy', 'Fantasy'],
    required: true,
  },
  releaseYear: {
       type: Number,
       required: true,
       min: 1874,
       max: maxYear
  }
})

module.exports = mongoose.model('Movie', movieSchema);
