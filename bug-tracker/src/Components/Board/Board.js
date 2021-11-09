import React, {useEffect, useContext, useState} from 'react'
import { useHistory, useParams } from 'react-router';
import { SketchPicker } from 'react-color';

import { encodeJWT, getRandomInt, localStorageRetrieve, swap } from '../../utilities';
import './Board.css'

import moreIcon from '../Icons/more.svg'
import leftIcon from '../Icons/left.svg'
import rightIcon from '../Icons/right.svg'
import fillIcon from '../Icons/fill.svg'
import fontColorIcon from '../Icons/fontcolor.svg'
import removeIcon from '../Icons/trash.svg'
import deleteIcon from '../Icons/cancel.svg'

import {ProjectContext} from "../../Context/projectContext";
import Menu, { MenuItem } from '../Menu/Menu';
import UseLongPress from '../Hook/UseLongPress';
import Popup from './Popup';
import django from '../../axiosRequest';
import requestAPI, { changeListColorReq, deleteListReq, getProjectLists, sendCardToReq, sendListToReq } from '../../requests';

function Board({title}) {
    const context = useContext(ProjectContext)
    
    const {id} = useParams();

    useEffect( () => {
        document.title = title;
        context.isAccessAllowed(id)
    },[]);

    //get lists
    useEffect( () => {
        getProjectLists(id).then(res=>{
            setLists(res['projects'])
        })
    },[]);



    const [selectedCard, setSelectedCard] = useState({})
    const [isPopupActive, setIsPopupActive] = useState(false)

    const [lists, setLists] = useState([])

    function sendListTo(position, list_index, list_id){
        let to = (position == 'l'? list_index - 1 : list_index + 1)
        if (to < 0 || to >= lists.length)
            return   

        const copy = [...lists];
        swap(copy, list_index, to)
        setLists(copy)

        const to_list_id = lists[to].list_id

        sendListToReq(list_id, to_list_id, id, position=='l'? true : false)
    }

    function sendCardTo(list_id, list_index, position, card_position, card_id){
        const copy = [...lists]
        let curr_list = copy[list_index]  
        let curr_cards = curr_list.cards

        switch(position){
            case 'l': case 'r':
                let to_list = (position == 'l'? list_index - 1 : list_index + 1)
                if (to_list < 0 || to_list >= lists.length)
                    return
                let temp_card = curr_cards[card_position]
                curr_cards.splice(card_position, 1)
                // go to l/r list
                curr_list = copy[to_list]  
                curr_cards = curr_list.cards
                curr_cards.unshift(temp_card)

                sendCardToReq(position, list_id, lists[to_list].list_id, card_id)
                setLists(copy)
                setSelectedCard({...temp_card, list_index:to_list, list_id:copy[to_list].list_id, position:0})
                break
            default:
                let to = null;
                if(position == 'u' || position == 'd')
                    to = (position == 'u'? card_position - 1 : card_position + 1)
                else
                    to = (position == 'du'? 0 : curr_cards.length-1)

                if (to < 0 || to >= curr_cards.length)
                    return   
                    
                sendCardToReq(position, list_id, curr_cards[to].card_id, card_id)
                swap(curr_cards, card_position, to)
                setLists(copy)
                setSelectedCard({...curr_list.cards[to], list_index, list_id, position:to})
        }
    }



    function createNewList(){
        const data = {jwt:localStorageRetrieve("jwt"),project_id:id, order:lists.length}
        const encoded = encodeJWT(data)

        return django
        .post(requestAPI.createNewList, encoded, {headers: {'Content-Type': 'text/plain'}})
        .then( res => {
            if(res?.data != undefined || res?.data != null){
                const copy = [...lists]
                copy.push({list_id:res.data, title:'Insert Title Here', background_color:'ebecf0', font_color:'323743', cards:[] })
                setLists(copy)
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function handleChangeListTitle(list_id, list_index, new_title){
        if(!new_title)
            return

        const copy = [...lists]
        let curr_list = copy[list_index]  
        copy[list_index] = {...curr_list, title:new_title}
        setLists(copy)

        const data = {jwt:localStorageRetrieve("jwt"),list_id:list_id, title:new_title}
        const encoded = encodeJWT(data)

        django
        .post(requestAPI.changeListTitle, encoded, {headers: {'Content-Type': 'text/plain'}})
        .catch((error) => {
            console.log(error);
        });

    }

    function handleChangeTextArea(type, card_id, list_index, card_position, text){
        if(!text && type=='title')
            return
        const copy = [...lists]
        let curr_list = copy[list_index]  
        let curr_cards = curr_list.cards

        if(type == 'title')
            curr_cards[card_position] = {...curr_cards[card_position], title:text}
        else if(type == 'description')
            curr_cards[card_position] = {...curr_cards[card_position], description:text}
        setLists(copy)

        const data = {jwt:localStorageRetrieve("jwt"), type, card_id, text}
        const encoded = encodeJWT(data)

        django
        .post(requestAPI.changeTextArea, encoded, {headers: {'Content-Type': 'text/plain'}})
        .catch((error) => {
            console.log(error);
        });
    }

    function removeCardTag(tag_id, tag_index, card_id, list_index, card_position){
        const copy = [...lists]
        let curr_list = copy[list_index]  
        let curr_card = curr_list.cards[card_position]
        let tags = curr_card.tags
        tags.splice(tag_index, 1)
        setLists(copy)

        const data = {jwt:localStorageRetrieve("jwt"), tag_id, card_id}
        const encoded = encodeJWT(data)

        django
        .post(requestAPI.removeTagFromCard, encoded, {headers: {'Content-Type': 'text/plain'}})
        .catch((error) => {
            console.log(error);
        });
    }

    function addCardTag(tag, list_index, card_position, card_id){
        const copy = [...lists]
        let curr_list = copy[list_index]  
        let curr_card = curr_list.cards[card_position]
        let tags = curr_card.tags
        tags.push(tag)
        setLists(copy)

        const data = {jwt:localStorageRetrieve("jwt"), tag_id:tag.tag_id, card_id}
        const encoded = encodeJWT(data)

        django
        .post(requestAPI.addTagToCard, encoded, {headers: {'Content-Type': 'text/plain'}})
        .catch((error) => {
            console.log(error);
        });
    }

    function removeCardUser(user_id, user_index, card_id, list_index, card_position){
        const copy = [...lists]
        let curr_list = copy[list_index]  
        let curr_card = curr_list.cards[card_position]
        let users = curr_card.users
        users.splice(user_index, 1)
        setLists(copy)

        const data = {user_id, card_id}
        const encoded = encodeJWT(data)

        django
        .post(requestAPI.removeMemberFromCard, encoded, {headers: {'Content-Type': 'text/plain'}})
        .catch((error) => {
            console.log(error);
        });
    }

    function addUser(user, card_id, list_index, card_position){
        const copy = [...lists]
        let curr_list = copy[list_index]  
        let curr_card = curr_list.cards[card_position]
        let users = curr_card.users
        users.push(user)
        setLists(copy)

        const data = {user_id:user.email, card_id}
        const encoded = encodeJWT(data)

        django
        .post(requestAPI.addMemberToCard, encoded, {headers: {'Content-Type': 'text/plain'}})
        .catch((error) => {
            console.log(error);
        });
    }

    function changeColor(type, list_index, list_id, color){  
        if(!color) return
        if(color[0] == '#'){
            color = color.slice(1,color.length)
        }    
        const copy = [...lists]
        let curr_list = copy[list_index]  
        switch(type){
            case 'font':
                copy[list_index] = {...curr_list, font_color:color}
                break
            case 'background':
                copy[list_index] = {...curr_list, background_color:color}
                break
        }
        
        setLists(copy)

        changeListColorReq(type, list_id, color)
    }

    function deleteList(list_id, list_index){
        const copy = [...lists]
        copy.splice(list_index, 1)
        setLists(copy)
        deleteListReq(id, list_id)
    }

    function createNewCard(list_id, list_index, title, ){
        const copy = [...lists]
        let curr_list = copy[list_index]  
        let curr_cards = curr_list.cards
        
        const data = {jwt:localStorageRetrieve("jwt"),list_id, order:curr_cards.length, title}
        const encoded = encodeJWT(data)

        return django
        .post(requestAPI.createNewCard, encoded, {headers: {'Content-Type': 'text/plain'}})
        .then( res => {
            if(res?.data != undefined || res?.data != null){
                const copy = [...lists]
                curr_cards.unshift({card_id:res.data, title, description:"", tags:[], users:[]})
                setLists(copy)
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function deleteCard(list_index, card_position){
        const copy = [...lists]
        let curr_list = copy[list_index]  
        curr_list.cards.splice(card_position, 1)
        setLists(copy)
    }

    return (
        <>
            {isPopupActive&&<>
            <Popup addUser={addUser}  addCardTag={addCardTag} removeCardTag={removeCardTag} removeCardUser={removeCardUser} handleChangeTextArea={handleChangeTextArea} sendCardTo={sendCardTo} deleteCard={deleteCard} selectedCard = {selectedCard} handleClose={setIsPopupActive} />
            </>}
            <div class="board">
                
                <div class="board-nav noselect">
                {
                 context.canUserModify() && 
                    <button class="board-button" onClick={createNewList}> <span style={{fontSize:"20px", fontWeight:"600"}}>&#43;</span> Create New List</button>
                }
                
                    </div>
                <div class="board-canvas">
                    <div class="board-content noselect">
                        {
                        lists && lists.length >0?<>   
                        {lists.map((list, list_index)=>{
                            return <List setIsPopupActive={setIsPopupActive} setSelectedCard={setSelectedCard} createNewCard={createNewCard} deleteList={deleteList} changeColor={changeColor} handleChangeListTitle={handleChangeListTitle} sendListTo={sendListTo} list_id={list.list_id} list_index={list_index} title={list.title} cards={list.cards} background={list.background_color} color={list.font_color} />
                        })}
                        </>
                        : 
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', color:'gray'}}>
                            You don't have any List Yet!
                        </div>
                        }
                    </div>
                </div>
            </div>   
        </>  
    )
}

export default Board

export function List({title, cards, background='ebecf0' , color='323743', list_id, list_index, sendListTo, handleChangeListTitle, changeColor, deleteList, createNewCard, setIsPopupActive, setSelectedCard}) {
    const context = useContext(ProjectContext)
    const [list_title, setList_title] = useState(title)
    const [isCreateActive, setIsCreateActive] = useState(false)
    const [isMoreActive, setIsMoreActive] = useState(false)

    const [fontColor, setFontColor] = useState({enabled:false, color:`#${color}`})
    const [backgroundColor, setBackgroundColor] = useState({enabled:false, color:`#${background}`})

    useEffect(() => {
        setList_title(title)
    }, [title])

    useEffect(() => {
        setBackgroundColor({enabled:false, color:`#${background}`})
    }, [background])

    useEffect(() => {
        setFontColor({enabled:false, color:`#${color}`})
    }, [color])

    const handleChangeComplete = (color, event) => {
        handleChangeComplete.setter({enabled:true, color:color.hex})            
      };

    const onLongPress = () => {
        setIsMoreActive(false)
        deleteList(list_id, list_index)
      };

      const onClickMore = () => {}

      const defaultOptions = {
        shouldPreventDefault: true,
        delay: 2000,
      };

      const longPressEvent = UseLongPress(onLongPress, onClickMore, defaultOptions);
      
    const handleClick = (event) => {
        setIsMoreActive(!isMoreActive);
      };

        return (
        <div class="board-list-wrapper">

        { (fontColor.enabled || backgroundColor.enabled) &&
            <div style={{display:'flex'}}>
                <SketchPicker
                    color={ fontColor.enabled?fontColor.color:backgroundColor.color }
                    onChangeComplete={ handleChangeComplete.setter = fontColor.enabled?setFontColor:setBackgroundColor, handleChangeComplete.typeOfSetter = fontColor.enabled?'font':'background',  handleChangeComplete}
                />
                <span onClick={()=>{
                    if(fontColor.enabled){
                        setFontColor({...fontColor, enabled:false})
                        changeColor('font', list_index, list_id, fontColor.color)
                    }else{ //backgroundColor enabled
                        setBackgroundColor({...backgroundColor, enabled:false})
                        changeColor('background', list_index, list_id, backgroundColor.color) 
                    }
                    
                }} style={{fontSize:"30px", fontWeight:"600", verticalAlign:'sub', paddingLeft:'10px', cursor: 'pointer' }}>&#215;</span>


            </div>
        }
            <div class="board-list" style={{backgroundColor:backgroundColor.color}}>
                <Menu
                    isOpen={isMoreActive}
                    handleClose={handleClick}
                >
                    <div style={{display:'flex'}} class="test">
                        <MenuItem title={'To The Left'} icon={leftIcon}  action={()=>{sendListTo('l',list_index, list_id); handleClick()}} />
                        <MenuItem title={'To The Right'} icon={rightIcon}  action={()=>{sendListTo('r',list_index, list_id); handleClick()}} />
                    </div>
                    <div style={{display:'flex'}} class="test">
                        <MenuItem title={'Background Color'} icon={fillIcon}   action={()=>{ setBackgroundColor({...backgroundColor,enabled:true}); handleClick()}} />
                        <MenuItem title={'Font Color'} icon={fontColorIcon}  action={()=>{ setFontColor({...fontColor, enabled:true}); handleClick()}} />
                    </div>
                    <dev  events class="menu-item long-press-button" {...longPressEvent} >
                        <img style={{width:'20px'}} src={removeIcon} />
                        <p>Hold For 3 second... To Remove The List</p>
                    </dev>

                </Menu>
                <div class="board-list-header">
                    <input style={{color:fontColor.color}} class="board-header-title" value={list_title} onChange={e =>{setList_title(e.target.value);}} onBlur={()=>handleChangeListTitle(list_id, list_index, list_title)} />
                    {
                    context.canUserModify() && 
                    <img onClick={()=>{setIsMoreActive(true)}} class="more-board-header" width='30px' src={moreIcon}/>
                    }
                </div>
                <div class="board-list-content">
                {
                 context.canUserModify() && 
                    <CreateCard createNewCard={createNewCard} list_id={list_id} list_index={list_index} handleClose={setIsCreateActive} active={isCreateActive} />
                }
                    {cards.map((card, position)=>{
                     return <div onClick={()=>{setSelectedCard({...card, list_index, list_id, position}); setIsPopupActive(true)}}><Card title={card.title} tags={card.tags} users={card.users} /></div>
                    })}

                    

                </div>
            </div>
        </div>
    )
}

export function Card({title, desc, tags, users}) {
    return (
        <div class="board-list-card">
            <div class="board-list-card-details">
                <div class="board-tags">
                {tags.map(tag=>{
                    return <Tag background={tag.background} tag_title={tag.title} />
                })}
                </div>
                <div class="border-title">
                    <p>{title}</p>
                </div>
                <div class="border-footer">
                    <div style={{flexDirection:'row-reverse', marginRight:'2px'}} class="avatar">
                        {users.map((user , i)=>{
                            if(i>10) // show 11 member
                            return <></>
                            return (
                                <div title={user.fullName} class="img" style={{width: '28px', height:'28px', fontSize:'13px', marginRight:'1px',backgroundColor: `rgb(${getRandomInt(125)},${getRandomInt(125)},${getRandomInt(125)})`}} >
                                    <div class="chars">{user.name}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Tag({background, tag_title, showCancel=false}) {
    return (
        <div width="100px" style={{backgroundColor:background, boxShadow:`0px 0px 3px 1px ${background}`, cursor: 'pointer'}} class={`board-tag-item ${showCancel && 'cancel-tag'}`} >
            <p>{tag_title} {showCancel && <div class='cancel-icon' style={{fontSize:'16px'}}>{showCancel? <span>&#215;</span> : <span>&#43;</span> }</div> }</p>
            
        </div>
    )
}

export function ControlTag({addCardTag, removeTag, background, tag_title}) {
    return (
        <div style={{marginTop:'10px', display: 'flex'}}>
            <div onClick={()=>{addCardTag()}} style={{backgroundColor:background, boxShadow:`0px 0px 1.5px 1px ${background}`, cursor: 'pointer'}} class={`control-tag-item`} >
                <div  class="control-shadow" /> <p>{tag_title}</p>   
            </div>

            <img onClick={()=>{removeTag()}}  style={{cursor: 'pointer'}} src={deleteIcon} />
        </div>
    )
}

export function CreateCard({active=false, handleClose, list_id, list_index, createNewCard}) {
    const [title, setTitle] = useState("")

    function autoGrow(e) {
        e.target.style.height = (e.target.value.length)-5+"px";
    }

    function handleTitle(e){
        let value = e.target.value;

        if(value.length == 0){
            e.target.style.height = '60px'
        }
        
        if(value[value.length-1] != '\n'){
            setTitle(e.target.value)
            autoGrow(e)
        }
    }

    return active?
        <div class="board-list-card">
            <div class="board-list-card-create">
                <div class="create-board-controls">
                    <button disabled = {!title} onClick={()=>{createNewCard(list_id, list_index, title); setTitle(''); handleClose(false);} } class="board-button">Create</button>
                    <button onClick={()=>handleClose(false)} class="board-button border-button-cancel">Cancel</button>
                </div>
                <textarea placeholder="Card Title...." value={title} onInput={(e)=>handleTitle(e)}/>
            </div>
        </div>
    :
    <div onClick={()=>{handleClose(true);}} class="board-list-card">
        <div class="board-list-card-create">
            <span style={{fontSize:"30px", fontWeight:"600", verticalAlign:'sub', paddingLeft:'10px' }}>&#43;</span> <p>Create New Card</p>
        </div>
    </div>
    
    
}