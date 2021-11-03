import React, {useState} from 'react'
import './Popup.css'

import descIcon from '../Icons/description.svg'
import membersIcon from '../Icons/groups.svg'
import cancelIcon from '../Icons/cancel.svg'
import tagsIcon from '../Icons/tag.svg'
import controlIcon from '../Icons/control_position.svg'
import leftIcon from '../Icons/left.svg'
import rightIcon from '../Icons/right.svg'
import upIcon from '../Icons/up.svg'
import downIcon from '../Icons/down.svg'
import removeIcon from '../Icons/trash.svg'
import fillIcon from '../Icons/fill.svg'

import { getRandomInt } from '../../utilities'
import { Tag } from './Board'

function Popup({card, handleClose}) {
    const [title, setTitle] = useState("")
    let oldTitle = ""

    const [description, setDescription] = useState("")
    let oldDescription = ""

    let users = [{name:'HU', fullName:"Hussain Ali"},{name:'HU', fullName:"Hussain Ali"},{name:'HU', fullName:"Hussain Ali"},]
    let tags = [{background:'dodgerblue', title:'tag'},{background:'dodgerblue', title:'tag'},{background:'dodgerblue', title:'tag'},{background:'dodgerblue', title:'tag'},{background:'dodgerblue', title:'tag'},{background:'dodgerblue', title:'tag'},]
    

    function autoGrow(e) {
        e.target.style.height = (e.target.value.length)/2.2+"px";
    }

    function handleTextArea(e, setter){
        let value = e.target.value;

        if(value.length == 0){
            e.target.style.height = '60px'
        }
        
        if(value[value.length-1] != '\n'){
            setter(e.target.value)
            autoGrow(e)
        }
    }
    return (
        <>
        <div onClick={()=>{handleClose(false)}} class="back popup-back"/>
        <div class="popup">
            <div class="popup-wrapper">
                <div class="popup-details">

                <div style={{marginTop:'0'}} class="sub-header"><img width={'21px'} src={tagsIcon} /> <h4>Tags In The Card</h4></div>
                    <div class="board-tags">
                        {tags.map(tag=>{
                            return <div style={{display: 'inline-block'}} onClick={()=>{}} >
                                        <Tag showCancel background={tag.background} tag_title={tag.title} />
                                </div>
                        })}
                    </div>

                    <textarea style={{marginTop:'20px'}} placeholder="Card Title...." value={title} onInput={(e)=>handleTextArea(e, setTitle)}/>
                    
                    <div class="sub-header"><img src={descIcon} /> <h4>Description</h4></div>
                    <textarea placeholder="Card Description...." value={description} onInput={(e)=>handleTextArea(e, setDescription)}/>
                    
                    <div class="sub-header"><img src={membersIcon} /> <h4>Members In The Card</h4></div>
                    <div style={{marginRight:'2px', cursor: 'default', display:'inline-block'}} class="avatar">
                        {users.map((user , i)=>{
                            return (
                                <div class={'cancel-tag'} onClick={()=>{}} style={{margin: '10px 10px', cursor: 'pointer', display:'inline-block'}}>
                                    <div style={{display:'flex', alignItems:'flex-start'}}>
                                        <div class="img" style={{width: '28px', height:'28px', fontSize:'13px', marginRight:'1px',backgroundColor: `rgb(${getRandomInt(125)},${getRandomInt(125)},${getRandomInt(125)})`}} >
                                            <div class="chars">{user.name}</div><div></div>
                                        </div>
                                        <h4 style={{marginLeft:'10px', marginRight:'3px', paddingTop:'2px'}}>{user.fullName}</h4> <img class='cancel-icon' src={cancelIcon} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>    
                    
                </div>
                <div style={{borderLeft:'3px solid rgb(249,248,246)'}} class="popup-controls">
                    <div >
                        <div style={{marginLeft:'10px'}} >

                            <div> <h4 style={{marginBottom:'3px'}}>From:</h4> <i>List {1} Position {1}</i></div>
                            <div style={{marginTop:'25px'}} class="sub-header"><img src={controlIcon} /> <h4>Send To</h4></div>
                            <button title='Send To Left' class="control-button" ><img src={leftIcon} /></button>
                            <button title='Send To Right' class="control-button"><img src={rightIcon} /></button>
                            <button title='Send To Up' class="control-button"><img src={upIcon} /></button>
                            <button title='Send To Bottom' class="control-button"><img src={downIcon} /></button>

                            <div style={{marginTop:'25px'}} class="sub-header"><img width="20px" src={tagsIcon} /> <h4>Select Tags</h4></div>
                            <input placeholder="Tag Title..." class="tag-input"/>
                            <div style={{display: 'flex', justifyContent:'space-between'}}>
                                <button style={{margin:'0'}} class='board-button'>Create Tag</button> 
                                <button title='Send To Bottom' class="control-button"><img src={fillIcon} /></button>
                            </div>

                            <hr class="donotcross"/>
                            <Tag showAdd background={'red'} tag_title={"Important"} />
                            {tags&& tags.length>0 && <hr class="donotcross"/>}

                            <div style={{marginTop:'32px'}} class="sub-header"><img width="20px" src={membersIcon} /> <h4>Select Member</h4></div>
                            <div style={{marginRight:'2px', cursor: 'default', display:'inline-block'}} class="avatar">
                            {users.map((user , i)=>{
                                return (
                                    <div class={'scale-tag'} onClick={()=>{}} style={{margin: '10px 10px', cursor: 'pointer', display:'inline-block'}}>
                                        <div style={{display:'flex', alignItems:'flex-start'}}>
                                            <div class="img" style={{width: '28px', height:'28px', fontSize:'13px', marginRight:'1px',backgroundColor: `rgb(${getRandomInt(125)},${getRandomInt(125)},${getRandomInt(125)})`}} >
                                                <div class="chars">{user.name}</div><div></div>
                                            </div>
                                            <h4 style={{marginLeft:'10px', marginRight:'3px', paddingTop:'2px'}}>{user.fullName}</h4>
                                        </div>
                                    </div>
                                );
                            })}
                            
                        </div>  
                            
                        <hr class="donotcross"/>
                        <dev  events class="menu-item long-press-button noselect" >
                            <img style={{width:'20px'}} src={removeIcon} />
                            <p>Hold To Delete This Card.</p>
                        </dev>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Popup
