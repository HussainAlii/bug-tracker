import React, {useState} from 'react'
import './Card.css'
import Menu, {MenuItem} from '../Menu/Menu'
import publicIcon from '../Icons/public.svg'
import privateIcon from '../Icons/private.svg'
import { createProject } from '../../requests'

export function CreateCard({cancel}) {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [access, setAccess] = useState("Public")

    const [anchor, setAnchor] = useState(false);
    const handleClick = (event) => {
        setAnchor(!anchor);
      };

    function handleCreateProject(){
        createProject(title, desc, access)
    }

    return (
        <div style={{cursor: 'default'}} class=" register-card">
        <div class="card-model noselect" style={{cursor: 'default', paddingTop:"13px"}} >
            <div class="card-header" >
                <input
                value={title}
                onChange={e=>{
                    if (title.length <=23 || title.length > e.target.value.length)
                    setTitle(e.target.value);
                }}
                type="text"
                placeholder="Project Name"
                />
                <div class="card-desc">
                <textarea value={desc} onChange={e=>{setDesc(e.target.value);}}
                wrap="on" cols="23" placeholder={"Project Description."} ></textarea>


                </div>
            </div>
            <div class="card-footer">
                <button style={{cursor: 'pointer'}} disabled={!title} onClick={handleCreateProject}>Confirm</button>
                <div onClick={handleClick} class="card-menu">{access}  {anchor?<span style={{color: 'darkgray'}}> &#9650;</span>:<span style={{color: 'darkgray'}}>&#9660;</span>}</div>                
                <Menu
                    isOpen={Boolean(anchor)}
                    handleClose={handleClick}
                >
                    <MenuItem title={'Public: Everyone can access'} icon={publicIcon}  action={()=>{setAccess("Public"); handleClick()}} />
                    <MenuItem title={'Private: Only Invited member'} icon={privateIcon}  action={()=>{setAccess("Private"); handleClick()}} />
                </Menu>
               
                <button style={{cursor: 'pointer', background:"crimson"}} onClick={()=>cancel(false)}>Cancel</button>
            </div>
        </div>
    </div>
    );
}