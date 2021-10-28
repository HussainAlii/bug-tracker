import React, {useEffect, useState} from 'react'
import './Projects.css'

import searchIcon from '../Icons/search.svg'
import addIcon from '../Icons/add.svg'

import Card from '../Card/Card'
import {CreateCard} from '../Card/ActionCard'
import django from '../../axiosRequest'
import requestAPI from '../../requests'
import { decodeJWT, encodeJWT, href, localStorageRetrieve, localStorageStore } from '../../utilities'
import { useHistory } from 'react-router'

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
