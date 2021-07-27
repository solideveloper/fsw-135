import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserProvider'

const initInputs = {
  comment: ""
}
const CommentForm = (props) => {
  const [inputs, setInputs] = useState(initInputs)
  const { createComment } = useContext(UserContext)

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createComment(event, inputs)
    setInputs(initInputs)
    props.toggleComment()
  }

  const { comment } = inputs
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="comment"
          value={comment}
          placeholder="Add Comment"
          onChange={handleChange} />
      <span><button className="bform">Submit</button></span>
      <span><button onClick={props.toggleComment} className="bform">Cancel</button></span>
      </form>
      
    </div>
  )
}

export default CommentForm;