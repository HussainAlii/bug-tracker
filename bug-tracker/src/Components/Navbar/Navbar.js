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
import shareIcon from "../Icons/share.svg"
import homeIcon from "../Icons/home.svg"
import cancelIcon from "../Icons/cancel.svg"

import { UserContext } from "../../Context/userContext";
import { getRandomInt, localStorageRetrieve } from "../../utilities";
import Projects from "../Projects/Projects";

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
  const history = useHistory()
  function exitProject(){
    localStorage.removeItem("project")
    localStorage.removeItem("project_title")
    history.push("/projects")
  }
  return (
    <div className="sidebar">
      <SidebarItem icon={dashboardIcon} title={"Dashboard"}/>
      <SidebarItem icon={projectIcon} title={"My Projects"} to={'/projects'}/>
      {
        localStorageRetrieve('project') && <>
      <hr/>
      <div className='project-title'>{localStorageRetrieve('project_title')}<img src={cancelIcon} title={"Exit Project"} onClick={()=>exitProject()} /> </div> 
      <hr/>
      
      
        
          <SidebarItem icon={homeIcon} title={"Home"} to={'/'+localStorageRetrieve('project')+'/home'} />
          <SidebarItem icon={shareIcon} title={"Share Project"} to={'/'+localStorageRetrieve('project')+'/share'} />
          
         </>}
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
    <div class="img" style={{backgroundColor: `rgb(${getRandomInt(125)},${getRandomInt(125)},${getRandomInt(125)})`}} ><div class="chars">{context.getUserInfo().fname[0]?.toUpperCase()}{context.getUserInfo().lname[0]?.toUpperCase()}</div></div>
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
