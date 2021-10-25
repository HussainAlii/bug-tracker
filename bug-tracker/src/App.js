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

import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';

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
            <Home title={`Home${title}`} />
        </PrivateRoute>

        <PrivateRoute exact path="/dashboard" >
            <Dashboard title={`Dashboard${title}`} />
        </PrivateRoute>

      <Route exact={true}> <SignIn title={`Sign In${title}`}/> </Route>


    </Switch>
  </div>
  </UserContextProvider>
</Router>
  );
}

export default App;
