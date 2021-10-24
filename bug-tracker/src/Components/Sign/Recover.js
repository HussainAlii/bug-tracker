import React, { useState, useEffect, useContext } from "react";
import PasswordStrengthBar from 'react-password-strength-bar';

import './Sign.css'
import logo from "../Icons/logo.png";

import {useHistory } from "react-router-dom";

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import { UserContext } from "../../Context/userContext";
import { localStorageRetrieve } from "../../utilities";

function Recover({title}) {
  const history = useHistory();
  const context = useContext(UserContext)
  
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [score, setScore] = useState(0);
  const [nomatch, setMatch] = useState(false);

  const [showMessage, setShowMessage] = useState([false,"",""]);


  function handleSignUp(){
    setShowMessage([true,'Password has been changed!', 'success'])
    setPassword("")
    setRepeatedPassword("")
    setScore(0)
    setScore(false)
  }

  console.log(password)

  useEffect(async () => {
    document.title = title;

    if(localStorageRetrieve("jwt")) history.push("/")
  },[]);


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

            <button disabled={!nomatch || score != 4 } onClick={handleSignUp}>Change Password</button>

            {showMessage[0]&&
            <Alert severity={showMessage[2]}>
            <AlertTitle>{showMessage[2].charAt(0).toUpperCase()+showMessage[2].slice(1)}</AlertTitle>
            <strong>{showMessage[1]}</strong>
          </Alert>
          }

          </div>
        </div>
      </div>
    )
}

export default Recover