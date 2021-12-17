import React, { useContext } from 'react'
import Auth from './components/Auth'
import { UserContext } from './context/UserProvider'
import { Routes, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import Public from './components/Public'
import Issues from './components/MyIssues'
import './style.css'


function App() {
  const { token } = useContext(UserContext)
  return (
    <div id='app'>
      <Navbar />
      <Routes>
        <Route
          exact path='/'
          render={() => token ? <Redirect to='/profile' /> : <Auth />}
        />
        <ProtectedRoute
          path='/profile'
          element={<Profile/>}
          redirectTo="/"
          token={token}
        />
        <ProtectedRoute 
          path="/public"
          element={<Public/>}
          redirectTo="/"
          token={token}
        />
        <ProtectedRoute 
          path="/myissues"
          element={<Issues/>}
          redirectTo="/"
          token={token}
        />
       
      </Routes>

    </div>
  );
}

export default App;
