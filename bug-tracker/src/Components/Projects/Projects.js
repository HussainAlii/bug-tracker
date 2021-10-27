import React, {useEffect, useState} from 'react'
import './Projects.css'

import searchIcon from '../Icons/search.svg'
import addIcon from '../Icons/add.svg'
import userIcon from '../Icons/user.png'

import Card from '../Card/Card'
import {CreateCard} from '../Card/ActionCard'
import django from '../../axiosRequest'
import requestAPI from '../../requests'
import { decodeJWT, encodeJWT, localStorageRetrieve } from '../../utilities'

function Projects({title}) {
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
            console.log(decoded)

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

      for(let i = 0; i <search.length; i++) {
        console.log()
        
    }

    // var searchElement = []

    // for(let i = 0; i <projects.length; i++) {
    //     console.log()
        
    // }
 

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
        var users = JSON.parse(project.users_photo)
        console.log(users)
        return <Card title={project.title} desc={project.description} access={project.access} action={()=>console.log(project.id)} users={users} />
        })}
    
    {search && 
        projects.map(project=>{
            if (project.title.substring(0, search.length) == search)
            {
                var users = JSON.parse(project.users_photo)
                console.log(users)
                return <Card title={project.title} desc={project.description} access={project.access} action={()=>console.log(project.id)} users={users} />
            }
            return
         })}

    

    </div>
</div>
)
}

export default Projects
