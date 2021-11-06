import React, {useEffect, useState} from 'react'
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
import double_arrow_down from '../Icons/double_arrow_down.svg'
import double_arrow_up from '../Icons/double_arrow_up.svg'

import { getRandomInt } from '../../utilities'
import { Tag } from './Board'
import { useParams } from 'react-router'
import UseLongPress from '../Hook/UseLongPress'
import { CirclePicker } from 'react-color'

function Popup({selectedCard, handleClose, deleteCard, sendCardTo, handleChangeTextArea, removeTag, removeUser, addTag, addUser}) {
    const {id} = useParams();
    const [currCard, setCurrCard] = useState(selectedCard)

    const [title, setTitle] = useState(currCard?.title)
    const [description, setDescription] = useState(currCard?.description)
    const [colorPanel, setColorPanel] = useState({color: '#e91e63', enabled: false, tag_title:''})
    
    const [tags_list, setTags_list] = useState([])
    const [users_list, setUsers_list] = useState([])

    //{tag_id:1,background:'dodgerblue', title:'tag3'}
    // {email:'bugtracker.bot@gmail.com',name:'HU', fullName:"Hussain Ali"}

    function isTagUsed(tag_id){
        for (const tag of selectedCard.tags){
            if(tag.tag_id == tag_id)
                return true
        }
        return false
    }

    function isUserUsed(user_id){
        for (const user of selectedCard.users){
            if(user.email == user_id)
                return true
        }
        return false
    }

    useEffect(() => {
        setCurrCard(selectedCard)
    },[selectedCard])


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

    // {card_id:'1', title:"this is a title", description:"this is a description", start_date:Date.now(), tags:tags_ex, users:users_ex}

    const onLongPress = () => {
        handleClose(false)
        deleteCard(currCard.list_id, currCard.list_index, currCard.position)
      };

      const onClickMore = () => {}

      const defaultOptions = {
        shouldPreventDefault: true,
        delay: 1000,
      };

      const longPressEvent = UseLongPress(onLongPress, onClickMore, defaultOptions);

      const handleChangeComplete = (color, event) => {
        setColorPanel({...colorPanel, enabled:true, color:color.hex})        
      };

    return (
        <>
        <div onClick={()=>{handleClose(false)}} class="back popup-back"/>
        <div class="popup">
            <div class="popup-wrapper">
                <div class="popup-details">
                {currCard?.tags.length > 0 && <>
                <div style={{marginTop:'0'}} class="sub-header"><img width={'21px'} src={tagsIcon} /> <h4>Tags In The Card</h4></div>
                    <div class="board-tags">
                        {currCard?.tags.map((tag, i)=>{
                            return <div style={{display: 'inline-block'}} onClick={()=>{removeTag(tag.tag_id, i, currCard.list_id, currCard.list_index, currCard.position )}} >
                                        <Tag showCancel background={tag.background} tag_title={tag.title} />
                                </div>
                        })}
                    </div>
                </>}

                    <textarea style={{marginTop:'30px'}} placeholder="Card Title...." value={title} onInput={(e)=>handleTextArea(e, setTitle)} onBlur={()=>{handleChangeTextArea('title', currCard.list_id, currCard.list_index, currCard.position, title)}} />
                    
                    <div class="sub-header"><img src={descIcon} /> <h4>Description</h4></div>
                    <textarea placeholder="Card Description...." value={description} onInput={(e)=>handleTextArea(e, setDescription)} onBlur={()=>{handleChangeTextArea('description', currCard.list_id, currCard.list_index, currCard.position, description)}} />
                    
                    {currCard?.users.length > 0 && <>
                    <div class="sub-header"><img src={membersIcon} /> <h4>Members In The Card</h4></div>
                    <div style={{marginRight:'2px', cursor: 'default', display:'inline-block'}} class="avatar">
                        {currCard.users.map((user , i)=>{
                            return (
                                <div class={'cancel-tag'} onClick={()=>{removeUser(user.user_id, i, currCard.list_id, currCard.list_index, currCard.position)}} style={{margin: '10px 10px', cursor: 'pointer', display:'inline-block'}}>
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
                    </>}
                    
                </div>
                <div style={{borderLeft:'3px solid rgb(249,248,246)'}} class="popup-controls">
                    <div >
                        <div style={{marginLeft:'10px'}} >

                            <div> <h4 style={{marginBottom:'3px'}}>From:</h4> <i>List {currCard?.list_index + 1} Position {currCard?.position + 1}</i></div>
                            <div style={{marginTop:'25px'}} class="sub-header"><img src={controlIcon} /> <h4>Send To</h4></div>
                            <button onClick={()=>{sendCardTo(currCard.list_id, currCard.list_index, 'l', currCard.position)}} title='Send To Left' class="control-button" ><img src={leftIcon} /></button>
                            <button onClick={()=>{sendCardTo(currCard.list_id, currCard.list_index, 'r', currCard.position)}} title='Send To Right' class="control-button"><img src={rightIcon} /></button>
                            <button onClick={()=>{sendCardTo(currCard.list_id, currCard.list_index, 'u', currCard.position)}} title='Send To Up' class="control-button"><img src={upIcon} /></button>
                            <button onClick={()=>{sendCardTo(currCard.list_id, currCard.list_index, 'd', currCard.position)}} title='Send To Bottom' class="control-button"><img src={downIcon} /></button>
                            <button onClick={()=>{sendCardTo(currCard.list_id, currCard.list_index, 'du', currCard.position)}} title='Send To First Index' class="control-button"><img src={double_arrow_up} /></button>
                            <button onClick={()=>{sendCardTo(currCard.list_id, currCard.list_index, 'dd', currCard.position)}} title='Send To Last Index' class="control-button"><img src={double_arrow_down} /></button>

                            <div style={{marginTop:'25px'}} class="sub-header"><img width="20px" src={tagsIcon} /> <h4>Select Tags</h4></div>
                            <input style={{backgroundColor:colorPanel.color}}  value={colorPanel.tag_title}  onFocus={()=>{setColorPanel({...colorPanel, enabled: true})}} onChange={(e)=>{setColorPanel({...colorPanel, tag_title:e.target.value})}}placeholder="Tag Title..." class="tag-input"/>
                            { colorPanel.enabled && <div style={{display: 'flex', justifyContent:'center', marginTop:'15px'}}>
                            <CirclePicker 
                                color={colorPanel.color}
                                onChangeComplete={ handleChangeComplete}
                            />
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <button onClick={()=>{setColorPanel({...colorPanel, enabled: false, tag_title:''})}} style={{margin:'0', width:'100px', height:'100%'}} class='board-button'>Create Tag</button> 
                                    <button onClick={()=>{setColorPanel({...colorPanel,  enabled: false, tag_title:''})}} style={{margin:'0', marginTop:'30px', width:'100px', height:'100%'}} class='board-button control-delete-button'>Close Tag Panel</button> 
                                </div>
                            </div>}

                            <hr class="donotcross"/>
                            {tags_list && tags_list.length > 0 && <>
                            {tags_list.map(tag =>{
                                if(isTagUsed(tag.tag_id))
                                    return <> </>
                                return <div style={{display: 'inline-block'}} onClick={()=>{addTag(tag, currCard.list_id, currCard.list_index, currCard.position)}}> <Tag showAdd background={tag.background} tag_title={tag.title} /></div>
                            })}
                            <hr class="donotcross"/></>}

                            {users_list && users_list.length>0 && <>
                            <div style={{marginTop:'32px'}} class="sub-header"><img width="20px" src={membersIcon} /> <h4>Select Member</h4></div>
                            <div style={{marginRight:'2px', cursor: 'default', display:'inline-block'}} class="avatar">
                                {users_list.map((user , i)=>{
                                if(isUserUsed(user.email))
                                return <> </>
                                return (
                                    <div class={'scale-tag'} onClick={()=>{addUser(user, currCard.list_id, currCard.list_index, currCard.position)}} style={{margin: '10px 10px', cursor: 'pointer', display:'inline-block'}}>
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
                        </>}

                        <dev  events class="menu-item long-press-button noselect" {...longPressEvent}>
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
