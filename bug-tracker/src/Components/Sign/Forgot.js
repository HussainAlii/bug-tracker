import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import './Sign.css'
import logo from "../Icons/logo.png";

function SignIn() {
  const [email, setEmail] = useState(null)

    return (
      <div class="background">
        <div className="sign-container">

          <div class="logo-container" style={{cursor: "default"}}>
            <img className="sign-logo" src={logo} alt="BTracker logo" />
            <h2 className="sign-logo">Bug-Tracker</h2>
          </div>

          <div class="login-form">
          <h3 style={{color:"gray", textAlign:"center"}}>Send a recovery link to:</h3>
              <input
              value={email}
              onChange={e=>{
                setEmail(e.target.value);
              }}
              type="text"
              className="Input"
              placeholder="Enter Email"
            />

            <button>Send Recovery Link</button>

            <hr/>

            <div className="login-footer"><Link to="./signin" ><p>Return to Login!</p></Link></div>

          </div>
        </div>
      </div>
    )
}

export default SignIn