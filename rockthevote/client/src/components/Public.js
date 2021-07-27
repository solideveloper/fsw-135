import React, { useContext } from 'react'
import IssueForm from './IssueForm'

// eslint-disable-next-line 
import { UserContext } from '../context/UserProvider.js'

export default function Public(){
  const {
  user: { username }, createIssue } = useContext(UserContext)
  return (
    <div id='public'>
     
     <h1>Welcome @{username}!</h1>
      <hr/>
      <h2>This is This Public Page</h2>
      <br/>
      <h3>Post an issue</h3>
      <IssueForm createIssue={createIssue} />
      </div>
    
  )
}