import React, {useEffect, useState, useContext} from 'react'
import './Popup.css'

import descIcon from '../Icons/description.svg'
import membersIcon from '../Icons/groups.svg'
import cancelIcon from '../Icons/cancel.svg'
import tagsIcon from '../Icons/tag.svg'
import controlIcon from '../Icons/control_position.svg'
import commentIcon from '../Icons/comments.svg'
import leftIcon from '../Icons/left.svg'
import rightIcon from '../Icons/right.svg'
import upIcon from '../Icons/up.svg'
import downIcon from '../Icons/down.svg'
import removeIcon from '../Icons/trash.svg'
import timerIcon from '../Icons/timer.svg'
import double_arrow_down from '../Icons/double_arrow_down.svg'
import double_arrow_up from '../Icons/double_arrow_up.svg'

import { encodeJWT, getRandomInt } from '../../utilities'
import { ControlTag, Tag } from './Board'
import { useParams } from 'react-router'
import UseLongPress from '../Hook/UseLongPress'
import { CirclePicker } from 'react-color'
import requestAPI, { deleteCardReq, loadPopup, submitCommentReq } from '../../requests'

import {ProjectContext} from "../../Context/projectContext";
import {UserContext} from "../../Context/userContext";
import django from '../../axiosRequest'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import Assignment from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';


function Popup({selectedCard, handleClose, deleteCard, sendCardTo, handleChangeTextArea, removeCardTag, removeCardUser, addCardTag, addUser, markCardStatus}) {
    const {id} = useParams();
    const context = useContext(ProjectContext)
    const userContext = useContext(UserContext)

    const [currCard, setCurrCard] = useState(selectedCard)

    const [markStatus, setMarkStatus] = useState(currCard?.status || 'open')
    const [title, setTitle] = useState(currCard?.title)
    const [description, setDescription] = useState(currCard?.description)
    const [comment, setComment] = useState('')
    const [colorPanel, setColorPanel] = useState({color: '#e91e63', enabled: false, tag_title:''})
    
    const [tagsList, setTagsList] = useState([])
    const [usersList, setUsersList] = useState([])
    const [commentsList, setCommentsList] = useState([])

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

    useEffect(() => { //load popup
        loadPopup(id, currCard.card_id).then((res) => {
            setTagsList(res.tags_list || [])
            setUsersList(res.users_list || [])
            setCommentsList(res.comments_list || [])
        })
    }, []);

    useEffect(() => {
        setCurrCard(selectedCard)
    },[selectedCard])


    function autoGrow(e) {
        e.target.style.height = (e.target.value.length)/1+"px";
    }

    function handleTextArea(e, setter){
        let value = e.target.value;

        if(value.length == 0){
            e.target.style.height = '70px'
        }
        
        if(value[value.length-1] != '\n'){
            setter(e.target.value)
            autoGrow(e)
        }
    }

    // {card_id:'1', title:"this is a title", description:"this is a description", start_date:Date.now(), tags:tags_ex, users:users_ex}

    const onLongPress = () => {
        handleClose(false)
        deleteCard(currCard.list_index, currCard.position)
        deleteCardReq(currCard.list_id, currCard.card_id)
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


      function createTag(){
        const data = {project_id:id, tag_title:colorPanel['tag_title'], color:colorPanel['color']}
        const encoded = encodeJWT(data)


        return django
        .post(requestAPI.createNewTag, encoded, {headers: {'Content-Type': 'text/plain'}})
        .then( res => {
            if(res?.data != undefined || res?.data != null){
                setTagsList([...tagsList, {'tag_id':res.data, title:colorPanel['tag_title'], background:colorPanel['color']}])
                setColorPanel({...colorPanel, enabled: false, tag_title:''})
            }
        })
        .catch((error) => {
            console.log(error);
        });
      }

      function removeTag(tag_id, tag_index){
        const data = {tag_id}
        const encoded = encodeJWT(data)

        const copy = [...tagsList]
        copy.splice(tag_index, 1)
        setTagsList(copy)

        django
        .post(requestAPI.removeTag, encoded, {headers: {'Content-Type': 'text/plain'}})
        .catch((error) => {
            console.log(error);
        });
    }

    function markCardStatusReq(status){
        markCardStatus(status, currCard.list_index, currCard.position )
        setMarkStatus(status)
        const data = {status, card_id:currCard.card_id, list_id:currCard.list_id}
        const encoded = encodeJWT(data)

        django
        .post(requestAPI.markCardStatus, encoded, {headers: {'Content-Type': 'text/plain'}})
        .catch((error) => {
            console.log(error);
        });
    }

    function autoGrow(e) {
        e.target.style.height = (e.target.value.length)-5+"px";
    }

    function handleComment(e){
        let value = e.target.value;

        if(value.length == 0){
            e.target.style.height = '60px'
        }
        
        if(value[value.length-1] != '\n'){
            setComment(e.target.value)
            autoGrow(e)
        }
    }

    function submitComment(comment){
        submitCommentReq(comment, currCard.card_id)
        setComment('')
        setCommentsList([{created_date: Date.now(),
            fullName:userContext.getUserInfo().fname + ' ' + userContext.getUserInfo().lname,
            name:userContext.getUserInfo().fname[0].toUpperCase() + userContext.getUserInfo().lname[0].toUpperCase(),
            message:comment, }, ...commentsList])
    }

    return (
        <>
        <div onClick={()=>{handleClose(false)}} class="back popup-back"/>
        <div class={`popup ${!context.canUserModify() && 'popup-guest'}`}>
            <div class="popup-wrapper">
                <div class="popup-details">
                    <div class="date-display"><img src={timerIcon} /> <p>{new Date(currCard.start_date).toLocaleString()}</p></div>
                    
                    <textarea style={{marginTop:'10px', fontSize:'18px', fontWeight:'bold'}} placeholder="Card Title...." value={title} onInput={(e)=>handleTextArea(e, setTitle)} onBlur={()=>{handleChangeTextArea('title', currCard.card_id, currCard.list_index, currCard.position, title)}} />
                    
                    <div class="sub-header"><img src={descIcon} /> <h4>Description</h4></div>
                    <textarea placeholder="Card Description...." value={description} onInput={(e)=>handleTextArea(e, setDescription)} onBlur={()=>{handleChangeTextArea('description', currCard.card_id, currCard.list_index, currCard.position, description)}} />
                    
                    {currCard?.tags.length > 0 && <>
                <div class="sub-header"><img width={'21px'} src={tagsIcon} /> <h4>Tags In The Card</h4></div>
                    <div class="board-tags">
                        {currCard?.tags.map((tag, i)=>{
                            return <div style={{display: 'inline-block'}} onClick={()=>{removeCardTag(tag.tag_id, i, currCard.card_id, currCard.list_index, currCard.position )}} >
                                        <Tag showCancel background={tag.background} tag_title={tag.title} />
                                </div>
                        })}
                    </div>
                </>}

                    {currCard?.users.length > 0 && <>
                    <div class="sub-header"><img src={membersIcon} /> <h4>Members In The Card</h4></div>
                    <div style={{marginRight:'2px', cursor: 'default', display:'inline-block'}} class="avatar">
                        {currCard.users.map((user , i)=>{
                            return (
                                <div class={'cancel-tag'} onClick={()=>{removeCardUser(user.email, i, currCard.card_id, currCard.list_index, currCard.position)}} style={{margin: '10px 10px', cursor: 'pointer', display:'inline-block'}}>
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
                    
                   
                    <div class="sub-header"><img width={'21px'} src={commentIcon} /> <h4>Comments</h4></div>
                    {context.canUserModify() && <>
                    <div style={{display:'flex'}}>
                        <div className="avatar noselect" style={{margin:'0', marginRight:'8px'}} >
                        <div class="img" style={{backgroundColor: `rgb(${getRandomInt(125)},${getRandomInt(125)},${getRandomInt(125)})`}} ><div class="chars">{userContext.getUserInfo().fname[0]?.toUpperCase()}{userContext.getUserInfo().lname[0]?.toUpperCase()}</div></div>
                        </div>
                        <textarea placeholder="Write A Comment..." value={comment} onInput={(e)=>handleComment(e)}/>
                    </div>
                    <button style={!comment && {display:'none'} || {marginTop:'10px', marginLeft:'0px'}} className="board-button" onClick={()=>{submitComment(comment); }}> Comment </button>
                    </>}

                    <br/>

                    { commentsList.length > 0 ? commentsList.map((comment) =>{
                        return <>
                        <p style={{direction:'rtl', margin:'0', marginBottom: '4px', fontSize:'12px', display:'flex', justifyContent: 'flex-end'}}>{new Date(comment.created_date).toLocaleString()}</p>
                    
                    <div class="comment">
                        <div className="avatar noselect" style={{margin:'0', marginRight:'8px'}} >
                            <div class="img" style={{backgroundColor: `rgb(${getRandomInt(125)},${getRandomInt(125)},${getRandomInt(125)})`}} ><div class="chars">{comment.name}</div></div>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <h4 style={{paddingTop:'5px'}}>{comment.fullName}</h4>
                            <p>{comment.message}</p>
                        </div>
                    </div>
                    </> 
                    }) : <b style={{marginLeft:'30px'}}>No Comments yet!</b>}
                
                </div>
                {
                 context.canUserModify() && 
                <div style={{borderLeft:'3px solid rgb(249,248,246)'}} class="popup-controls">
                    <div >
                        <div style={{marginLeft:'10px'}} >

                            <div style={{display:'flex', justifyContent:'flex-end', marginBottom:'10px'}}>
                                <FormControlLabel
                                control={
                                <Checkbox
                                    checked={markStatus == 'closed'? true : false}
                                    onChange={e=>{
                                        if(e.target.checked) markCardStatusReq('closed');
                                        else markCardStatusReq('open');
                                    }}
                                    disableRipple
                                    icon={<Assignment />}
                                    checkedIcon={<AssignmentTurnedInIcon />}
                                    style ={{
                                        color: "#A781D2",
                                    }}
                                    />
                                }
                                label={markStatus == 'closed'? 'Done' : 'Open'}
                                className="noselect"

                                labelPlacement={"start"}
                                />
                            </div>
                                   
                            <div style={{display:'flex', justifyContent:'space-around'}}><h4 style={{ display:'inline-block', marginBottom:'0px'}}>From:</h4> <i>List {currCard?.list_index + 1} Position {currCard?.position + 1}</i></div>
                            <div class="sub-header"><img src={controlIcon} /> <h4>Send To</h4></div>
                            <button onClick={()=>{sendCardTo(currCard.list_id, currCard.list_index, 'l', currCard.position, currCard.card_id)}} title='Send To Left' class="control-button" ><img src={leftIcon} /></button>
                            <button onClick={()=>{sendCardTo(currCard.list_id, currCard.list_index, 'r', currCard.position, currCard.card_id)}} title='Send To Right' class="control-button"><img src={rightIcon} /></button>
                            <button onClick={()=>{sendCardTo(currCard.list_id, currCard.list_index, 'u', currCard.position, currCard.card_id)}} title='Send To Up' class="control-button"><img src={upIcon} /></button>
                            <button onClick={()=>{sendCardTo(currCard.list_id, currCard.list_index, 'd', currCard.position, currCard.card_id)}} title='Send To Bottom' class="control-button"><img src={downIcon} /></button>
                            <button onClick={()=>{sendCardTo(currCard.list_id, currCard.list_index, 'du', currCard.position, currCard.card_id)}} title='Send To First Index' class="control-button"><img src={double_arrow_up} /></button>
                            <button onClick={()=>{sendCardTo(currCard.list_id, currCard.list_index, 'dd', currCard.position, currCard.card_id)}} title='Send To Last Index' class="control-button"><img src={double_arrow_down} /></button>

                            <div class="sub-header"><img width="20px" src={tagsIcon} /> <h4>Select Tags</h4></div>

                            <input style={{backgroundColor:colorPanel.color}}  value={colorPanel.tag_title}  onFocus={()=>{setColorPanel({...colorPanel, enabled: true})}} onChange={(e)=>{
                                if(colorPanel['tag_title'].length <=27 || colorPanel['tag_title'].length > e.target.value.length )
                                setColorPanel({...colorPanel, tag_title:e.target.value}
                                )}} placeholder="Tag Title..." class="tag-input" />
                            { colorPanel.enabled && <div style={{display: 'flex', justifyContent:'center'}}>
                           
                            <CirclePicker 
                                color={colorPanel.color}
                                onChangeComplete={ handleChangeComplete}
                            />
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <button onClick={()=>{createTag()}} style={{margin:'0', width:'100px', height:'100%'}} class='board-button'>Create New Tag</button> 
                                    <button onClick={()=>{setColorPanel({...colorPanel,  enabled: false, tag_title:''})}} style={{margin:'0', marginTop:'30px', width:'100px', height:'100%'}} class='board-button control-delete-button'>Close Tag Panel</button> 
                                </div>
                            </div>}

                            {tagsList && tagsList.length > 0 && <>
                            {tagsList.map((tag, i) =>{
                                if(isTagUsed(tag.tag_id))
                                    return <> </>
                                return <div> <ControlTag removeTag={()=>removeTag(tag.tag_id, i)}  addCardTag={()=>addCardTag(tag, currCard.list_index, currCard.position, currCard.card_id)} background={tag.background} tag_title={tag.title} /></div>
                            })}
                            <hr class="donotcross"/></>}

                            {usersList && usersList.length>0 && <>
                            <div class="sub-header"><img width="20px" src={membersIcon} /> <h4>Select Member</h4></div>
                            <div style={{marginRight:'2px', cursor: 'default', display:'inline-block'}} class="avatar">
                                {usersList.map((user , i)=>{
                                if(isUserUsed(user.email))
                                return <> </>
                                return (
                                    <div class={'scale-tag'} onClick={()=>{addUser(user, currCard.card_id, currCard.list_index, currCard.position)}} style={{margin: '10px 10px', cursor: 'pointer', display:'inline-block'}}>
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
                }
            </div>
        </div>
        </>
    )
}

export default Popup
