const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  username: {
    type: String, 
    required: true
  },
  imgUrl: {
    type: String
  },
  postDate: {
    type: String,
    required: true,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model("Issue", issueSchema)