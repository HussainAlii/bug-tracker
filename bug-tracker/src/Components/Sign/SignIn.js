import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import './Sign.css'
import logo from "../Icons/logo.png";
import auth from "../auth/auth";

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showError, setShowError] = useState(false);
  
  useEffect(async () => {
    document.title = "Sign In - BTracker";
    if(auth.isAuth()){
        history.push("/");
    }   
  },[]);

  function handleSignIn(){
    setShowError(auth.login());
  }

  
    return (
      <div class="background">
        <div className="sign-container">

          <div class="logo-container" style={{cursor: "default"}}>
            <img className="sign-logo" src={logo} alt="BTracker logo" />
            <h2 className="sign-logo">Bug-Tracker</h2>
          </div>

          <div class="login-form">
          <h3 style={{color:"gray", textAlign:"center"}}>Sign In to B-Tracker</h3>
              <input
              value={email}
              onChange={e=>{
                setEmail(e.target.value);
              }}
              type="text"
              className="Input"
              placeholder="Enter Email"
            />

            <input
              value={password}
              onChange={e=>{
                setPassword(e.target.value);
              }}
              type="password"
              className="Input"
              placeholder="Enter Password"
            />

            <button onClick={handleSignIn}>Login</button>

            <hr/>

            <div className="login-footer"><Link to="./forgot" ><p>Forgot Password!</p> </Link> <Link to="./signup" ><p>Create New Account!</p></Link></div>
            {showError&&
            <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>Email or Password is incorrect. </strong>
          </Alert>
          }
          </div>
        </div>
      </div>
    )
}

export default SignIn