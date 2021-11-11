import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';

import { decodeJWT, getRandomInt, isValidEmail, localStorageRetrieve, localStorageStore, refresh } from "../../utilities";

import './Sign.css'
import { UserContext } from "../../Context/userContext";

function UserSetting({title=""}) {
    const history = useHistory();
    const context = useContext(UserContext)

    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
  
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState();
  
  
    const [score, setScore] = useState(0);
    const [nomatch, setMatch] = useState(false);
  
    function handleChangePassword(){
        context.changePassword(localStorageRetrieve("jwt"), password)
    }

    function handleChangeUserName(){
        context.changeUsername(localStorageRetrieve("jwt"), fname, lname)
    }

    useEffect(() => {
      document.title = title;

      if(context.getUserInfo().fname)
        setFname(context.getUserInfo().fname)

      if(context.getUserInfo().lname)
        setLname(context.getUserInfo().lname)
      // if(localStorageRetrieve("jwt")) history.push("/")
    },[context.getUserInfo().fname, context.getUserInfo().lname]);



    return (
      <div style={{paddingBottom:"1px"}}>
        <div class="user-setting">

          <div class="update-form">
            <h3 style={{color:"gray", textAlign:"center",}}>Update Profile</h3>

          <div style={{marginTop:'30px', paddingLeft:'30px'}} class="group-input">
            <div class="avatar">
              <div class="img" style={{width:"120px", height:"120px", fontSize:"70px", backgroundColor: `rgb(${getRandomInt(125)},${getRandomInt(125)},${getRandomInt(125)})`}} ><div class="chars">{fname&&fname[0]?.toUpperCase()}{lname&&lname[0]?.toUpperCase()}</div></div>
            </div> 
          </div>

          <p style={{marginTop:'6px', textAlign:'center'}}>{decodeJWT(localStorageRetrieve('jwt'))['email']}</p>

              
                <div class="group-input">
                  <input
                    value={fname}
                    onChange={e=>{
                      setFname(e.target.value);
                    }}
                    type="text"
                    className=""
                    placeholder="First Name"
                    autoComplete="off"
                    />

                    <input
                    value={lname}
                    onChange={e=>{
                      setLname(e.target.value);
                    }}
                    type="text"
                    className=""
                    placeholder="Last Name"
                    autoComplete="off"
                    />
                </div>

                <div class="group-input">
                  <button disabled={!fname || !lname || fname == context.getUserInfo().fname && lname == context.getUserInfo().lname  } onClick={handleChangeUserName}>Update Username</button>
                </div>



              <div class="group-input">
              <input
                value={password}
                onChange={e=>{
                  setPassword(e.target.value);
                  setMatch(e.target.value == repeatedPassword)
                }}
                type="password"
                className="Input"
                placeholder="Password!"
                autoComplete="off"
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
                autoComplete="off"
              />
              
              </div>

              <PasswordStrengthBar password={password} onChangeScore={e=>{setScore(e)}} />
              <div class="group-input">
                <button disabled={!nomatch || score != 4 } onClick={handleChangePassword}>Update Password</button>
              </div>
          </div>
        </div>
      </div>
    )
}

export default UserSetting
