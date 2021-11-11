import React, { useState, useEffect, useContext  } from "react";
import "./Navbar.css";
import { NavLink, Link, useHistory } from "react-router-dom";
import logoutIcon from '../Icons/logout.svg'
import leaveIcon from '../Icons/leaveIcon.svg'
import settingIcon from '../Icons/settings1.svg'
import Menu, {MenuItem} from "../Menu/Menu";

import logo from "../Icons/logo.png";
import projectIcon from "../Icons/project.svg"
import dashboardIcon from "../Icons/dashboard.svg"
import shareIcon from "../Icons/share.svg"
import boardIcon from "../Icons/board.svg"
import cancelIcon from "../Icons/cancel.svg"
import burgerIcon from "../Icons/burger.svg"

import { UserContext } from "../../Context/userContext";
import { ProjectContext } from "../../Context/projectContext";
import { getRandomInt, href, localStorageRetrieve } from "../../utilities";
import Projects from "../Projects/Projects";
import { leaveProject } from "../../requests";
import { AlertDialog } from "../Alert/Alert";

function Navbar() {
  const context = useContext(UserContext);
  return (
    <nav>
      
        <div class="logo-container">
            <img id="burger-icon" src={burgerIcon} />
          <Link to="/">
            <div class="logo-container">
                <img className="logo" src={logo} alt="BTracker logo" />
                <h2 className="logo">Bug-Tracker {context.isDemo && '[Demo]'}</h2>
              </div>
            </Link>
        </div>
      <Account />
    </nav>
  );
}

export function SignNavbar() {

  return (
    <nav>
      
        <div class="logo-container">
          <Link to="/">
            <div class="logo-container">
                <img className="logo" src={logo} alt="BTracker logo" />
                <h2 className="logo">Bug-Tracker</h2>
              </div>
            </Link>
        </div>
        <div style={{display: 'flex'}}>
          <button onClick={() =>{href('/signup')}} class="sign-button-nav register-button-nav">Sign Up For Free</button>
          <button onClick={() =>{href('/')}} class="sign-button-nav">Login</button>
      </div>
    </nav>
  );
}

export function Sidebar(){
  const history = useHistory()
  const context = useContext(ProjectContext)
  const [isAlertOpen, setAlert] = useState(false);
  const handleCloseAlert = () => {
    setAlert(false);
  };
  return (
    <>
    {isAlertOpen&&<AlertDialog action={leaveProject} open={isAlertOpen} handleClose={handleCloseAlert} message={"Are you sure you want to leave \'"+ context.getProjectInfo().projectTitle + "\' project?\n"} title={"Warning!"}/>}

    <div className="sidebar">
      <SidebarItem icon={dashboardIcon} title={"Dashboard"}/>
      <SidebarItem icon={projectIcon} title={"My Projects"} to={'/projects'}/>
      {
        localStorageRetrieve('project') && context.getProjectInfo().projectRank !='guest' ? <>
      <hr/>
      <div className='project-title'>{context.getProjectInfo().projectTitle}<img src={cancelIcon} title={"Exit Project"} onClick={context.closeProject} /> </div> 
      <hr style={{height:'2px'}} />
          <SidebarItem icon={boardIcon} title={"Board"} to={'/'+localStorageRetrieve('project')} />
          {(context.getProjectInfo().projectRank =='superAdmin' || context.getProjectInfo().projectRank =='admin') && <SidebarItem icon={shareIcon} title={"Share Project"} to={'/'+localStorageRetrieve('project')+'/share'} />}
          {context.getProjectInfo().projectRank =='superAdmin' && <SidebarItem icon={settingIcon} title={"Project Setting"} to={'/'+localStorageRetrieve('project')+'/setting'} />}
          
         {context.getProjectInfo().projectRank !='superAdmin' &&
         <>
          <hr style={{height:'5px'}} />
          <div onClick={()=>setAlert(true)} className="sidebar-item">
            <img src={leaveIcon} style={{verticalAlign:'middle', marginTop:'4px'}} />  <span style={{color:"#f50057", fontWeight:"600"}}>Leave Project</span>
          </div>
        </>}
        
         </>: localStorage.removeItem('project')}
    </div>
    </>
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
        <MenuItem title='Setting' icon={settingIcon} action={()=>{href("/setting")}} />
        <MenuItem title='Logout' icon={logoutIcon} action={()=>{context.logout()}} />
      </Menu>
    </div>
    </>
  );
}

export default Navbar;
