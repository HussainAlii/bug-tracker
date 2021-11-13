import React, {useEffect, useState, useContext} from 'react'
import './Projects.css'

import searchIcon from '../Icons/search.svg'
import addIcon from '../Icons/add.svg'
import publicIcon from '../Icons/public.svg'
import privateIcon from '../Icons/private.svg'

import Card from '../Card/Card'
import {CreateCard} from '../Card/ActionCard'
import django from '../../axiosRequest'
import requestAPI, { deleteProject, updateProject } from '../../requests'
import { decodeJWT, encodeJWT, href, localStorageRetrieve, localStorageStore } from '../../utilities'
import { useHistory, useParams } from 'react-router'

import Menu, {MenuItem} from '../Menu/Menu'

import {ProjectContext} from "../../Context/projectContext";
import { AlertDialog } from '../Alert/Alert'

function Projects({title}) {
    const context = useContext(ProjectContext)
    const [search, setSearch] = useState("")
    const [isCreateActive, setIsCreateActive] = useState(false)
    const [closedProjects, setClosedProjects] = useState([])
    const [projects, setProjects] = useState([])
    

    useEffect(() => {
        document.title = title;

        const data = {jwt:localStorageRetrieve("jwt")}
        const encoded = encodeJWT(data)

        django
        .post(requestAPI.getProjects, encoded, {headers: {'Content-Type': 'text/plain'}})
        .then((response) => {
            let decoded = decodeJWT(response["data"])["projects"]
            
                if (decoded){
                    setProjects(decoded["open_projects"] || [])
                    setClosedProjects(decoded["closed_projects"] || [])
                }
        })
        .catch((error) => {
            console.log(error);
        });

      },[]);

      function createProject(){
        setIsCreateActive(true)
      }

      

return (
<div style={{paddingBottom:"11px", marginLeft:'40px', marginTop:'55px'}}>
    <div class="bar">
        <div className="search-model">
            <img className="searchIcon" src={searchIcon} alt="searchbar" />
            <input
                value={search}
                onChange={e=>{setSearch(e.target.value)}}
                type="text"
                className="searchInput"
                placeholder={'Search Project...'}
            />
        </div>
    </div>

    <div class="project-model">

        {isCreateActive?<CreateCard cancel={setIsCreateActive} /> : 
        <div class="card" onClick={createProject}>
            <div class="create-project-card noselect">
                <p>Create New Project</p>
                <img src={addIcon} />
            </div>
        </div>
    }

        {!search && projects && 
        projects.map(project=>{
                return <Card title={project.title} desc={project.description} access={project.access} action={()=>context.openProject(project.id)} users={project.users} />
        })}
    
        {search && 
            projects.map(project=>{
            if (project.title.substring(0, search.length).toLowerCase() == search.toLowerCase())
            {
                return <Card title={project.title} desc={project.description} access={project.access} action={()=>context.openProject(project.id)} users={project.users}  />
            }
            return
         })}

    

    </div>
    
    {closedProjects.length > 0 && <h1 className="close-project-title">Archived Projects</h1>}

    <div class="project-model" style={{marginTop:'0'}}>

        {!search && projects && 
        closedProjects.map(project=>{
                return <Card title={project.title} desc={project.description} access={project.access} action={()=>context.openProject(project.id)} users={project.users} />
            })}

        {search && 
            closedProjects.map(project=>{
            if (project.title.substring(0, search.length).toLowerCase() == search.toLowerCase())
            {
                return <Card title={project.title} desc={project.description} access={project.access} action={()=>context.openProject(project.id)} users={project.users}  />
            }
            return
         })}
    
    </div>

</div>
)
}

export default Projects


export function ProjectSetting({title}) {
  const context = useContext(ProjectContext)

    const {id} = useParams();
    const history = useHistory()

    const [projectTitle, setProjectTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [access, setAccess] = useState("Public")
    const [invitationLink, setInvitationLink] = useState(true)
    const [isClosed, setIsClosed] = useState(false)
    const [anchor, setAnchor] = useState(false);
    
    const [isAlertOpen, setAlert] = useState(false);
  
    useEffect( async () => {
        document.title = title;
        context.isAccessAllowed(id)
        context.getProjectInfo().projectRank !='superAdmin' && history.push("/")
        !localStorageRetrieve("project") && localStorageRetrieve("project") != id && history.push("/")

        const data = {jwt:localStorageRetrieve("jwt"),project_id:localStorageRetrieve("project")}
        const encoded = encodeJWT(data)
        
        django
        .post(requestAPI.getProject, encoded, {headers: {'Content-Type': 'text/plain'}})
        .then((response) => {
            if (response) {
                let decoded = decodeJWT(response["data"])["project"]
                if (decoded){
                    let project_invitationLink = decoded['invitation']? true : false
                    setProjectTitle(decoded['project_title'])
                    setDesc(decoded['description'])
                    setAccess(decoded['access'])
                    setInvitationLink(project_invitationLink)
                    setIsClosed(decoded['is_closed'])
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
      },[]);

      const handleCloseAlert = () => {
        setAlert(false);
      };

      function handleConfirm(){
        updateProject(projectTitle, desc, access, invitationLink, isClosed)
      }

      function handleDeleteProject(){
        setAlert(true)
      }

    const handleClick = (event) => {
        setAnchor(!anchor);
      };

    return (
        <>
        {isAlertOpen&&<AlertDialog action={deleteProject} open={isAlertOpen} handleClose={handleCloseAlert} message={"Are you sure you want to delete \'"+ projectTitle + "\' project?\nYou will lose all the work progress in this project!"} title={"Warning!"}/>}
        <div style={{paddingBottom:"11px", marginLeft:'40px', marginTop:'55px', overflow: 'scroll'}}>
          <div className="project-setting">

              <div class="setting-form">
            <h3 style={{color:"gray", textAlign:"center", paddingRight:'33px'}}>Project Setting</h3>

                  <div style={{marginTop:"50px"}} className="form-item">
                      <input value={projectTitle} onChange={(e)=>{
                          if (projectTitle.length <=23 || projectTitle.length > e.target.value.length)
                              setProjectTitle(e.target.value)
                          }} />
                      <label className={projectTitle&&'vaild'}>Project Title:</label>
                  </div>

                  <div className="form-item">
                      <textarea value={desc} onChange={(e)=>{setDesc(e.target.value)}} />
                      <label className={desc&&'vaild-textarea'}>Project Description:</label>
                  </div>

                  <div onClick={handleClick} className="form-menu">
                  <div class="card-menu">{access}  {anchor?<span style={{color: 'darkgray'}}> &#9650;</span>:<span style={{color: 'darkgray'}}>&#9660;</span>}</div>                
                      <Menu
                          isOpen={Boolean(anchor)}
                          handleClose={handleClick}
                      >
                          <MenuItem title={'Public: Everyone can access'} icon={publicIcon}  action={()=>{setAccess("Public"); handleClick()}} />
                          <MenuItem title={'Private: Only Invited member'} icon={privateIcon}  action={()=>{setAccess("Private"); handleClick()}} />
                      </Menu>
                  </div>
                  
                  <div class="form-item noselect" style={{cursor:"pointer"}} onClick={()=>setInvitationLink(!invitationLink)}>
                  <label class="switch">
                    <input checked={invitationLink} type="checkbox"/>
                    <span class="slider round"></span>
                  </label>
                  <p className={`switch-label ${invitationLink&& 'switch-label-selected'}` }>Allow invitation Link!</p>
                  </div>

                  <div class="form-item noselect" style={{cursor:"pointer"}} onClick={()=>setIsClosed(!isClosed)}>
                  <label class="switch">
                    <input checked={isClosed} type="checkbox"/>
                    <span class="slider round danger-slider"></span>
                  </label>
                  <p className={`switch-label ${isClosed&& 'switch-label-selected'}` }>Archive This Project!</p>
                  </div>

                  <div className="form-item">
                  <button disabled={!projectTitle} onClick={handleConfirm}>Confirm</button>
                  <button id="form-delete" style={{marginLeft:"20px"}} onClick={handleDeleteProject}>Delete Project</button>
                  </div>
              </div>
              
          </div>
        </div>
        </>
    )
}