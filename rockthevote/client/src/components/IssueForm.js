import React, { useState } from 'react'

const initInputs = {
  title: "",
  details: "",
  imgUrl: ""
}

const IssueForm = (props) => {
  const [inputs, setInputs] = useState(initInputs)
  const { createIssue } = props

  const handleChange = (e) => {
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createIssue(inputs)
    setInputs(initInputs)
  }

  const { title, imgUrl, details} = inputs
  return (
    <div className = "loginBox">
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        value={title} 
        onChange={handleChange} 
        placeholder="Topic"/>

        <br/>

      <input 
        type="text" 
        name="details" 
        value={details} 
        onChange={handleChange} 
        placeholder="Description"/>

        <br/>

        <input 
        type="text" 
        name="imgUrl" 
        value={imgUrl} 
        onChange={handleChange} 
        placeholder="Image Url"/>

        <br/>
        <br/>
      <button className="sform">Submit</button>
    </form>
    </div>
  )
}

export default IssueForm;