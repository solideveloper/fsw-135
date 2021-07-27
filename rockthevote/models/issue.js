const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  usersVoted: [{
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"    
    }
  }]
});

/* Upvotes and Downvotes*/
issueSchema.methods.addUpvote = function(){
  const issue = this.toObject()
  let upvotes = upvotes + 1
  return upvotes
}
issueSchema.methods.addDownvote = function(){
  const issue = this.toObject()
  let downvotes = downvotes + 1
  return downvotes
}

module.exports = mongoose.model("Issue", issueSchema);
