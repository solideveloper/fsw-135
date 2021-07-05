const express = require('express');
const issueRouter = express.Router();
const Issue = require('../models/issue.js')


issueRouter
//Get All Issues
  

  .get('/', (req, res, next) => {
    Issue.find((err, issues) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

// Get Issues by user id
  .get("/user:userId", (req, res, next) => {
    Issue.find({ user: req.user._id }, (err, issues) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(issues)
    })
  })

  //Get Issue by Id
  .get('/:issueId', (req, res, next) => {
    Issue.findOne({_id: req.params.issueId}, (err, issue)=> {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(issue)
    })
  })
  

  .post("/", (req, res, next) => {
    req.body.userID = req.user._id
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})

//Add Like
  .put('/likes/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate(
      {_id: req.params.issueId},
      {$inc: {likes: 1}},
      {new: true},
      (err, updatedIssue) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(updatedIssue)
      }
    )
  })
  
  //Add Dislike
 .put('/dislikes/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate(
      {_id: req.params.issueId},
      {$inc: {dislikes: 1}},
      {new: true},
      (err, updatedIssue) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(updatedIssue)
      }
    )
  })

//Update
.put('/:issueId', (req, res, next)=>{
    Issue.findOneAndUpdate(
      {_id: req.params.issueId},
      req.body,
      {new: true},
      (err, updatedIssue)=> {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(updatedIssue)
    })
  })
//Delete
.delete('/:issueId', (req, res, next)=> {
    Issue.findOneAndDelete(
      {_id: req.params.issueId},
      (err, deletedItem)=>{
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted ${deletedItem} from the database.`)
      }
    )
  })
  
  module.exports = issueRouter

