import React, {useState} from 'react'
import './Card.css'

export function RegisterCard({cancel}) {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    function handleCreateProject(){

    }

    return (
        <div style={{cursor: 'default'}} class="card">
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
                <button style={{cursor: 'pointer'}} onClick={handleCreateProject}>Confirm</button>
                <button style={{cursor: 'pointer', background:"crimson"}} onClick={()=>cancel(false)}>Cancel</button>
            </div>
        </div>
    </div>
    );
}