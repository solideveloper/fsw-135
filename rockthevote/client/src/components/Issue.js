import React, { useContext, useState } from 'react'
import Comment from './Comment'
import {UserContext} from '../context/UserProvider'
import CommentForm from './CommentForm'

const Issue = (props) => {
  const [setsComments, setComment] = useState(false)
  const [showComments, setShowComments] = useState(false)
  
  const {
    user: 
    { username }, 
    getIssueComments, 
    issueComments, 
    getUsername, 
    addUpvote, 
    addDownvote, 
    getIssuesByUser
  } = useContext(UserContext)
  
  const { 
    title, 
    details, 
    imgUrl, 
    _id 
  } = props
  
  
  const toggleComment =  () => {
    setComment(prevState => !prevState)
  }

  const allComments = () => {
    setShowComments(prevState => !prevState)
    if(!showComments){
    getIssueComments(_id)
    }
  }

  const addAnUpvote = (event) => {
    addUpvote(event)
    getIssuesByUser()
    event.preventDefault()
    
  }

  const addADownvote = (event) => {
    addDownvote(event)
    getIssuesByUser()
    event.preventDefault()
  }

  return (
    <div id={_id} key={_id} className = 'issue'>

      <h3 className="title">{title}</h3>
      <img src={imgUrl}alt="issueIMG" className="img"/>
      <p>{details}</p>
      <span><em>Posted By: @{username}</em></span>
      <br />
      <span>Upvotes: {props.upvotes}</span>
      <br/>
      <span>Downvotes: {props.downvotes}</span>
      <br/>

      {showComments ?
      issueComments.map(comment => 
        <Comment {...comment} 
          key={comment._id} 
          getUsername = {getUsername}
        />) 
      : 
      <button className="bform" onClick={allComments}>View Comments</button>}
      {showComments 
      ? 
      <button className="bform" onClick={allComments}>Hide Comments</button> : ""}
      {setsComments ? 
        <CommentForm 
          toggleComment = {toggleComment}
        /> 
      : 
      <button className="bform" onClick={toggleComment}>Post a Comment</button>}
      {!showComments 
      ? 
      <button className="bform" onClick={addAnUpvote}>Upvote</button> : "" }
      {!showComments ? 
      <button className="bform" onClick={addADownvote}>Downvote</button> : ""}
      <br/>
    </div>
 
  )
}

export default Issue;
