import React, {useEffect, useState} from 'react'
import './Projects.css'

import searchIcon from '../Icons/search.svg'
import addIcon from '../Icons/add.svg'
import publicIcon from '../Icons/public.svg'
import privateIcon from '../Icons/private.svg'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Card from '../Card/Card'
import {CreateCard} from '../Card/ActionCard'
import django from '../../axiosRequest'
import requestAPI, { deleteProject, updateProject } from '../../requests'
import { decodeJWT, encodeJWT, href, localStorageRetrieve, localStorageStore } from '../../utilities'
import { useHistory } from 'react-router'

import Menu, {MenuItem} from '../Menu/Menu'


function Projects({title}) {
    const history = useHistory()
    const [search, setSearch] = useState("")
    const [isCreateActive, setIsCreateActive] = useState(false)
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
                    setProjects(decoded)
                }
        })
        .catch((error) => {
            console.log(error);
        });

      },[]);

      function createProject(){
        setIsCreateActive(true)
      }

      function openProject(id, name){
          localStorageStore("project", id)
          localStorageStore("project_title", name)
          history.push(`/${id}/Home`)
      }

return (
<div style={{paddingBottom:"1px"}}>
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
                return <Card title={project.title} desc={project.description} access={project.access} action={()=>openProject(project.id, project.title)} users={project.users} />
        })}
    
        {search && 
            projects.map(project=>{
            if (project.title.substring(0, search.length).toLowerCase() == search.toLowerCase())
            {
                return <Card title={project.title} desc={project.description} access={project.access} action={()=>openProject(project.id, project.title)} users={project.users}  />
            }
            return
         })}

    

    </div>
</div>
)
}

export default Projects

export function ProjectSetting({title}) {
    const project_name = localStorageRetrieve("project_title")
    const [projectTitle, setProjectTitle] = useState(project_name)
    const [desc, setDesc] = useState("")
    const [access, setAccess] = useState("Public")
    const [anchor, setAnchor] = useState(false);
    
    const [isAlertOpen, setAlert] = useState(false);

    useEffect( async () => {
        document.title = title;
        
        const data = {jwt:localStorageRetrieve("jwt"),project_id:localStorageRetrieve("project")}
        const encoded = encodeJWT(data)
        
        django
        .post(requestAPI.getProject, encoded, {headers: {'Content-Type': 'text/plain'}})
        .then((response) => {
            if (response) {
                let decoded = decodeJWT(response["data"])["project"]
                if (decoded){
                    setDesc(decoded['description'])
                    setAccess(decoded['access'])
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
        localStorageStore("project_title", projectTitle)
        updateProject(projectTitle, desc, access)
      }

      function handleConfirm(){
          
        localStorageStore("project_title", projectTitle)
        updateProject(projectTitle, desc, access)
      }

      function handleDeleteProject(){
        setAlert(true)
      }

    const handleClick = (event) => {
        setAnchor(!anchor);
      };

    return (
        <>
        {isAlertOpen&&<AlertDialog action={deleteProject} open={isAlertOpen} handleClose={handleCloseAlert} message={"Are you sure you want to delete \'"+ project_name + "\' project?\nYou will lose all the work progress in this project!"} title={"Warning!"}/>}
        <div className="setting">
            <h2 style={{color:"#323743", font: '30px sans-serif'}}>Project Setting</h2>
            <div class="setting-form">
                <div className="form-item">
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
                
                <div className="form-item">
                <button disabled={!projectTitle} onClick={handleConfirm}>Confirm</button>
                <button id="form-delete" style={{marginLeft:"20px"}} onClick={handleDeleteProject}>Delete Project</button>
                </div>
            </div>
            
        </div>
        </>
    )
}

export function AlertDialog({action=null, open, handleClose, message, title}) {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle style={{backgroundColor:"#334",color:"lightgray"}} id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent style={{backgroundColor:"#334"}}>
            <DialogContentText style={{color:"darkgray"}} id="alert-dialog-description">
              <div dangerouslySetInnerHTML={{__html: message}}></div>
  
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{backgroundColor:"#334"}}>
            <Button onClick={action?action:handleClose} style={{color:"white"}} autoFocus>
              Ok
            </Button>
            <Button onClick={handleClose} style={{color:"white"}} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }