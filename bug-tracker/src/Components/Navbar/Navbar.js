import React, { useState, useEffect, useContext  } from "react";
import "./Navbar.css";
import { NavLink, Link, useHistory } from "react-router-dom";

import logo from "../Icons/logo.png";
import avatar from "../Icons/user.png";

import Menu from "../Menu/Menu";

import { UserContext } from "../../Context/userContext";

function Navbar() {

  return (
    <nav>
      <Link to="/">
        <div class="logo-container">
          <img className="logo" src={logo} alt="BTracker logo" />
          <h2 className="logo">Bug-Tracker</h2>
        </div>
      </Link>
      <Account />
    </nav>
  );
}

function Account() {
  const context = useContext(UserContext)
  
  const [anchor, setAnchor] = React.useState(false);

  const handleClick = (event) => {
    setAnchor(!anchor);
  };

  return (
    <>
    <div className="avatar noselect" onClick={handleClick}>
    <img
        // src={context.userInfo.userInfo?.photoURL? context.userInfo.userInfo?.photoURL : avatar}
        src={avatar}
        alt="avatar icon"
      />
    <div class="name">{`${context.getUserInfo().fname} ${context.getUserInfo().lname}`}  {anchor?<span style={{color: 'darkgray', marginLeft:'5px'}}> &#9650;</span>:<span style={{color: 'darkgray', marginLeft:'5px'}}>&#9660;</span>}</div>   
      <Menu
        isOpen={Boolean(anchor)}
        handleClose={handleClick}
      />
    </div>
    </>
  );
}

export default Navbar;
