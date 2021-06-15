const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true, 
  },
  available: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Store", storeSchema);
