import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import './Sign.css'
import logo from "../Icons/logo.png";
import { isValidEmail, localStorageRetrieve } from "../../utilities";

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import { UserContext } from "../../Context/userContext";

function Forgot({title}) {
  const history = useHistory();
  const context = useContext(UserContext)

  const [email, setEmail] = useState(null)
  const [showMessage, setShowMessage] = useState([false,"",""]);

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

            <button onClick={()=>{isValidEmail(email)?setShowMessage([true,'Recovery link has been sent to your email', 'success']):setShowMessage([true,'Entered Email is incorrect.','error'])}}>Send Recovery Link</button>

            <hr/>

            <div className="login-footer"><Link to="/signin/" ><p>Return to Login!</p></Link></div>
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

export default Forgot