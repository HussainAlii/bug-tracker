import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';

import { isValidEmail } from "../../utilities";

import './Sign.css'
import logo from "../Icons/logo.png";
import auth from "../auth/auth";

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

function SignIn({title,isAuth}) {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");


  const [score, setScore] = useState(0);
  const [nomatch, setMatch] = useState(false);

  const [showMessage, setShowMessage] = useState([false,"",""]);


  async function handleSignUp(){
    setShowMessage(await auth.register(email, password, fname, lname))
    clearPasswords()
  }

  function clearPasswords(){
    setEmail("")
    setPassword("")
    setRepeatedPassword("")
    setScore(0)
    setMatch(false);
  }

  console.log(password)
  useEffect(() => {
    document.title = title;

    auth.check_Authorization()
  },[]);


    return (
      <div class="background">
        <div className="sign-container">

          <div class="logo-container" style={{cursor: "default"}}>
            <img className="sign-logo" src={logo} alt="BTracker logo" />
            <h2 className="sign-logo">Bug-Tracker</h2>
          </div>

          <div class="login-form">
          <h3 style={{color:"gray", textAlign:"center"}}>Sign Up to B-Tracker</h3>

              <div class="name-input">
                <input
                value={fname}
                onChange={e=>{
                  setFname(e.target.value);
                }}
                type="text"
                className=""
                placeholder="First Name"
                />

                <input
                value={lname}
                onChange={e=>{
                  setLname(e.target.value);
                }}
                type="text"
                className=""
                placeholder="Last Name"
                />

              </div>

              <input
              value={email}
              onChange={e=>{
                setEmail(e.target.value);
              }}
              type="email"
              className="Input"
              placeholder="Email"
              />

            <input
              value={password}
              onChange={e=>{
                setPassword(e.target.value);
                setMatch(e.target.value == repeatedPassword)
              }}
              type="password"
              className="Input"
              placeholder="Password!"
            />



            <input
              value={repeatedPassword}
              onChange={e=>{
                setRepeatedPassword(e.target.value);
                setMatch(e.target.value == password)
              }}
              type="password"
              className="Input"
              placeholder="Confirm Password!"
            />

            <PasswordStrengthBar password={password} onChangeScore={e=>{setScore(e)}} />

            <button disabled={!nomatch || score != 4 || !isValidEmail(email) || !fname || !lname } onClick={handleSignUp}>Register</button>

            <hr/>

            <div className="login-footer"><Link to="./signin" ><p>Return to Login!</p></Link></div>

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

export default SignIn