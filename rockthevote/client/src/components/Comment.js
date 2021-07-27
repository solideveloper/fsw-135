import React from 'react'

const Comment = (props) => {  
  const { 
    _id, 
    username, 
  } = props
  


  return (
    <div key={_id} id={_id} className='comment'>
      <br/>
      <span>
     <em>@{username}: </em> {props.comment}
      </span> 
      <br/>
    </div>
  )
}

export default Comment;