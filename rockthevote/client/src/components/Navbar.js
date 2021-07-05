
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

export default function Navbar(){
  const { logout, token } = useContext(UserContext)
  return (
    <div className = "navbar">
   
    {token && <Link to='/profile'>Profile</Link>}
    {token &&<Link to='/issue'>Issues</Link>}
   
    {token && <button onClick = {logout}>Logout</button>}
  </div>
  )
}