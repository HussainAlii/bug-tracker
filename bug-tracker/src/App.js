import React, {useState, useEffect} from 'react'
import './App.css';

import SignIn from './Components/Sign/SignIn';
import Forgot from './Components/Sign/Forgot'
import Signup from './Components/Sign/Signup'
import Recover from './Components/Sign/Recover'
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import UserContextProvider from './Context/userContext'
import requestAPI from './requests';
import { decodeJWT, localStorageRetrieve } from './utilities';
import django from './axiosRequest';

function App() {
  let title = " - BTracker";

  const [isAuth, setIsAuth] = useState(localStorageRetrieve("jwt") != "")  
  console.log(isAuth)

  useEffect( () => { //detect if user auth
      let token = localStorageRetrieve("jwt")
      if(token){
          django
          .post(requestAPI.isAuth, token, {headers: {'Content-Type': 'text/plain'}})
          .then((response) => {
              if (response) {
                  setIsAuth(decodeJWT(response["data"])['0'])  
              }
          })
          .catch((error) => {
              console.log(error);
              setIsAuth(false) 
          });
      }else{
          setIsAuth(false) 
          localStorage.removeItem('jwt');
      }

  }, [setIsAuth])

  return (
    <Router>
      <UserContextProvider>
  <div className="app">
    <Switch>
      <Route isAuth={isAuth} exact path="/signin"> <SignIn title={`Sign In${title}`}/> </Route>
      <Route isAuth={isAuth} exact path="/signup"> <Signup title={`Sign up${title}`}/> </Route>
      <Route isAuth={isAuth} exact path="/forgot"> <Forgot title={`Forgot${title}`}/> </Route>
      <Route isAuth={isAuth} exact path="/recover"> <Recover title={`Recover${title}`}/> </Route>

      <PrivateRoute exact path="/" isAuth={isAuth}>
            
        </PrivateRoute>

      <Route isAuth={isAuth} exact={true}> <SignIn title={`Sign In${title}`}/> </Route>


    </Switch>
  </div>
  </UserContextProvider>
</Router>
  );
}

export default App;
