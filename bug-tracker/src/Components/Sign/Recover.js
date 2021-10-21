import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';

import './Sign.css'
import logo from "../Icons/logo.png";

function SignIn() {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [score, setScore] = useState(0);
  const [nomatch, setMatch] = useState(false);

  function handleSignUp(){
    console.log("change password")
  }

  console.log(password)
    return (
      <div class="background">
        <div className="sign-container">

          <div class="logo-container" style={{cursor: "default"}}>
            <img className="sign-logo" src={logo} alt="BTracker logo" />
            <h2 className="sign-logo">Bug-Tracker</h2>
          </div>

          <div class="login-form">
          <h3 style={{color:"gray", textAlign:"center"}}>Recover B-Tracker Account</h3>

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

            <button disabled={!nomatch || score != 4} onClick={handleSignUp}>Change Password</button>

          </div>
        </div>
      </div>
    )
}

export default SignIn