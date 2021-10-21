import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';

import { isValidEmail } from "../../utilities";

import './Sign.css'
import logo from "../Icons/logo.png";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [score, setScore] = useState(0);
  const [nomatch, setMatch] = useState(false);

  function handleSignUp(){
    console.log("register")
  }

    return (
      <div class="background">
        <div className="sign-container">

          <div class="logo-container" style={{cursor: "default"}}>
            <img className="sign-logo" src={logo} alt="BTracker logo" />
            <h2 className="sign-logo">Bug-Tracker</h2>
          </div>

          <div class="login-form">
          <h3 style={{color:"gray", textAlign:"center"}}>Sign Up to B-Tracker</h3>
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
                setMatch(e.target.value == repeatedPassword)
              }}
              type="password"
              className="Input"
              placeholder="Enter Password!"
            />

            <input
              value={repeatedPassword}
              onChange={e=>{
                setRepeatedPassword(e.target.value);
                setMatch(e.target.value == password)
              }}
              type="password"
              className="Input"
              placeholder="Enter Password again!"
            />

            <PasswordStrengthBar password={password} onChangeScore={e=>{setScore(e)}} />

            <button disabled={!nomatch || score != 4 || !isValidEmail(email) } onClick={handleSignUp}>Register</button>

            <hr/>

            <div className="login-footer"><Link to="./signin" ><p>Return to Login!</p></Link></div>

          </div>
        </div>
      </div>
    )
}

export default SignIn