const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')

//Get All By Issue Id
commentRouter
  .get('/issues/:issueId', (req, res, next) => {
  Comment.find({issueId: req.params.issueId}, (err, comment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comment)
  })
})

//Get All By User
  .get('/user/:userId', (req, res, next) => {
    Comment.find({user: req.params.userId}, (err, comment)=> {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(comment)
    })
})

//Get All
  .get('/', (req, res, next) => {
  Comment.find( (err, comment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comment)
  })
})

//Post

  .post('/', (req, res, next)=> {
  req.body.user = req.user._id
  req.body.username = req.user.username
  const newComment = new Comment(req.body)
  newComment.save((err, savedComment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedComment)
  })
})

//Add Like
  .put('/likes/:commentId', (req, res, next) => {
  Comment.findOneAndUpdate(
    {_id: req.params.commentId},
    {$inc: {likes: 1}},
    {new: true},
    (err, updatedComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedComment)
    }
  )
})

//Add dislike
  .put('/dislikes/:commentId', (req, res, next) => {
  Comment.findOneAndUpdate(
    {_id: req.params.commentId},
    {$inc: {dislikes: 1}},
    {new: true},
    (err, updatedComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedComment)
    }
  )
})

//Delete
  .delete('/:commentId', (req, res, next)=> {
  Comment.findOneAndDelete(
    {_id: req.params.commentId},
    (err, deletedItem)=>{
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted comment from database.`)
    }
  )
})

module.exports = commentRouter