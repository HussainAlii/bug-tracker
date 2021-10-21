import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import './Sign.css'
import logo from "../Icons/logo.png";

function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(async () => {
    if(false){
        history.push("/");
    }   
  },[]);

  
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

            <button>Login</button>

            <hr/>

            <div className="login-footer"><Link to="./forgot" ><p>Forgot Password!</p> </Link> <Link to="./signup" ><p>Create New Account!</p></Link></div>

          </div>
        </div>
      </div>
    )
}

export default SignIn