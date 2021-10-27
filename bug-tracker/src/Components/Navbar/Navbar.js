import React, { useState, useEffect, useContext  } from "react";
import "./Navbar.css";
import { NavLink, Link, useHistory } from "react-router-dom";
import logoutIcon from '../Icons/logout.svg'
import settingIcon from '../Icons/setting.svg'
import Menu, {MenuItem} from "../Menu/Menu";

import logo from "../Icons/logo.png";
import avatar from "../Icons/user.png";
import projectIcon from "../Icons/project.svg"
import dashboardIcon from "../Icons/dashboard.svg"

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

export function Sidebar(){

  return (
    <div className="sidebar">
      <SidebarItem icon={dashboardIcon} title={"Dashboard"} className="n"/>
      <SidebarItem icon={projectIcon} title={"My Projects"} to={'/projects'} className="n"/>
    </div>
  );
}

export function SidebarItem({title, icon, to='/' }) {
  return (
      <NavLink
      exact
      activeClassName="active-sidebar-item"
      onlyActiveOnIndex
      to={to}
    >
      <div className="sidebar-item">
          <img src={icon} />  <p>{title}</p>
      </div>
      </NavLink>
  )
}


export function Account() {
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
      >
        <MenuItem title='Setting' icon={settingIcon} action={()=>{alert("Not implemented yet!")}} />
        <MenuItem title='Logout' icon={logoutIcon} action={()=>{context.logout()}} />
      </Menu>
    </div>
    </>
  );
}

export default Navbar;
