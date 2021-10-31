import React, {useState, useEffect} from 'react'
import './App.css';

import SignIn from './Components/Sign/SignIn';
import Forgot from './Components/Sign/Forgot'
import SignUp from './Components/Sign/Signup'
import Recover from './Components/Sign/Recover'
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import UserContextProvider from './Context/userContext'
import requestAPI from './requests';
import { decodeJWT, localStorageRetrieve } from './utilities';
import django from './axiosRequest';

import Projects, { ProjectSetting } from './Components/Projects/Projects';
import Dashboard from './Components/Dashboard/Dashboard';
import Board from './Components/Board/Board';
import Share from './Components/Share/Share';
import UserSetting from './Components/Sign/UserSetting';
import Invite from './Components/Sign/Invite';

function App() {
  let title = " - BTracker";
  return (
    <Router>
      <UserContextProvider>
  <div className="app">
    <Switch>
      <Route exact path="/signin"> <SignIn title={`Sign In${title}`}/> </Route>
      <Route exact path="/signup"> <SignUp title={`Sign up${title}`}/> </Route>
      <Route exact path="/forgot"> <Forgot title={`Forgot${title}`}/> </Route>
      <Route exact path="/recover/:token"> <Recover title={`Recover${title}`}/> </Route>

      <PrivateRoute exact path="/" >
            <Dashboard title={`Dashboard${title}`} />
        </PrivateRoute>
        
      <PrivateRoute exact path="/setting" >
        <UserSetting title={`Setting${title}`}/>
      </PrivateRoute>

        <PrivateRoute exact path="/projects" >
            <Projects title={`My Projects${title}`} />
        </PrivateRoute>

        <PrivateRoute exact path="/:id/board" >
            <Board title={`Board${title}`} />
        </PrivateRoute>

        <PrivateRoute exact path="/:id/share" >
            <Share title={`Share${title}`} />
        </PrivateRoute>

        <PrivateRoute exact path="/:id/setting" >
            <ProjectSetting title={`Setting${title}`} />
        </PrivateRoute>

        <PrivateRoute exact path="/invite/:id/:invite_id" >
            <Invite title={`Invite${title}`} />
        </PrivateRoute>

      <Route exact={true}> <SignIn title={`Sign In${title}`}/> </Route>


    </Switch>
  </div>
  </UserContextProvider>
</Router>
  );
}

export default App;
