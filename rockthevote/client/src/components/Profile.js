import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'

export default function Profile () {

  const { user } = useContext(UserContext)

  return (
    <div id='profile'>

      <h1>Welcome, {user.username}</h1>
      <p>This is your profile page!</p>
     
     
  
    </div>
  )
}