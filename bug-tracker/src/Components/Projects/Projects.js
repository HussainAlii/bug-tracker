import React, {useEffect, useState} from 'react'
import './Projects.css'

import searchIcon from '../Icons/search.svg'
import addIcon from '../Icons/add.svg'
import userIcon from '../Icons/user.png'

import Card from '../Card/Card'
import {RegisterCard} from '../Card/ActionCard'

function Projects({title}) {
    const [search, setSearch] = useState("")
    const [isCreateActive, setIsCreateActive] = useState(true)

    useEffect(() => {
        document.title = title;
      },[]);

      function createProject(){
        setIsCreateActive(true)
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

        {isCreateActive?<RegisterCard cancel={setIsCreateActive} /> : 
        <div class="card" onClick={createProject}>
            <div class="create-project-card noselect">
                <p>Create New Project</p>
                <img src={addIcon} />
            </div>
        </div>
    }

    <Card title={"the killer of the of thD"} desc={"my-project-is-about-the-livingg"} action={createProject} users={[userIcon,userIcon]} />


    </div>
</div>
)
}

export default Projects
