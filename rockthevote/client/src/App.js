import React, { useContext } from 'react'
import './app.css';
import Auth from './components/Auth'
import { UserContext } from './context/UserProvider'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'
import Issue from './components/IssueForm'
import Profile from './components/Profile'
import AuthorizedRoute from './components/AuthorizedRoute'


function App() {
  const { token } = useContext(UserContext)
  return (
    <div id='app'>
      <Navbar />
      <Switch>
        <Route
          exact path='/'
          render={() => token ? <Redirect to='/profile' /> : <Auth />}
        />
        <AuthorizedRoute
          path='/profile'
          component={Profile}
          redirectTo="/"
          token={token}
        />
       
         <AuthorizedRoute
          path='/issue'
          component={Issue}
          redirectTo="/"
          token={token}
        />
        
        
      </Switch>

    </div>
  );
}

export default App;
