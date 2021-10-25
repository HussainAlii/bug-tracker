import React, {useEffect, useState} from 'react'
import './Projects.css'

import searchIcon from '../Icons/search.svg'
import addIcon from '../Icons/add.svg'
import userIcon from '../Icons/user.png'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

function Projects({title}) {
    const [search, setSearch] = useState("")
    useEffect(() => {
        document.title = title;
      },[]);

      function createProject(){
        alert("c")

      }

return (
<div>
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
        <div class="card">
            <div class="create-project-card noselect" onClick={createProject}>
                <p>Create New Project</p>
                <img src={addIcon} />
            </div>
        </div>

        <div class="card">
            <div class="card-model noselect" onClick={createProject}>
                <div class="card-header">
                    <h3>Card title</h3>
                    <div class="card-desc">
                        <p>bla bla bla lala la bla la.
                        bla bla bla lala la bla la.bla bla bla lala la bla la.
                        bla bla bla lala la bla la.bla bla bla lala la bla la.
                        bla bla bla lala la bla la.bla bla bla lala la bla la.
                        bla bla bla lala la bla la.bla bla bla lala la bla la.
                        bla bla bla lala la bla la.bla bla bla lala la bla la.
                        bla bla bla lala la bla la.bla bla bla lala la bla la.
                        </p>
                    </div>
                </div>

                <div class="card-footer">
                    <div class="users">
                        <img src={userIcon} />
                        <img src={userIcon} />
                        <img src={userIcon} />
                    </div>
                    <p>3</p>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-model noselect" onClick={createProject}>
                <div class="card-header">
                    <h3>Card title</h3>
                    <div class="card-desc">
                        <p>bla bla bla lala la bla la.
                        </p>
                    </div>
                </div>

                <div class="card-footer">
                    <div class="users">
                        <img src={userIcon} />
                    </div>
                    <p>1</p>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-model noselect" onClick={createProject}>
                <div class="card-header">
                    <h3>Card title</h3>
                    <div class="card-desc">
                        <p>
                        </p>
                    </div>
                </div>

                <div class="card-footer">
                    <div class="users">
                        <img src={userIcon} />
                    </div>
                    <p>1</p>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-model noselect" onClick={createProject}>
                <div class="card-header">
                    <h3>Card title</h3>
                    <div class="card-desc">
                        <p>bla bla bla lala la bla la.
                        </p>
                    </div>
                </div>

                <div class="card-footer">
                    <div class="users">
                        <img src={userIcon} />
                        <img src={userIcon} />
                        <img src={userIcon} />
                        <img src={userIcon} />
                        <img src={userIcon} />
                        <img src={userIcon} />
                        <img src={userIcon} />
                        <img src={userIcon} />
                        <img src={userIcon} />
                        <img src={userIcon} />
                        <img src={userIcon} />
                        <img src={userIcon} />
                    </div>
                    <p>10</p>
                </div>
            </div>
        </div>

    </div>
</div>
)
}

export default Projects
