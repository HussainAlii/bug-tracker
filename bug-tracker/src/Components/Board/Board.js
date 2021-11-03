import React, {useEffect, useContext, useState} from 'react'
import { useHistory, useParams } from 'react-router';
import { SketchPicker } from 'react-color';

import { getRandomInt, localStorageRetrieve } from '../../utilities';
import './Board.css'

import moreIcon from '../Icons/more.svg'
import leftIcon from '../Icons/left.svg'
import rightIcon from '../Icons/right.svg'
import fillIcon from '../Icons/fill.svg'
import fontColorIcon from '../Icons/fontcolor.svg'
import removeIcon from '../Icons/trash.svg'

import {ProjectContext} from "../../Context/projectContext";
import Menu, { MenuItem } from '../Menu/Menu';
import UseLongPress from '../Hook/UseLongPress';
import Popup from './Popup';

function Board({title}) {
    const context = useContext(ProjectContext)

    const history = useHistory()
    const {id} = useParams();

    const [selectedCard, setSelectedCard] = useState({})
    const [isPopupActive, setIsPopupActive] = useState(true)
    
    useEffect( () => {
        document.title = title;
        context.isAccessAllowed(id)
    },[]);
    
    let tags_ex = [{background:'dodgerblue', title:'tag'},]
    let users_ex = [{name:'HU', fullName:"Hussain Ali"},]
    let cards=[{card_id:'1', title:"this is a title", description:"this is a description", start_date:Date.now(), tags:tags_ex, users:users_ex},]
    let lists=[{list_id:'1', title:'To DO', background_color:'ebecf0', font_color:'323743', cards:cards }]
    
    return (
        <>
            {isPopupActive&&<>
            <Popup card = {selectedCard} handleClose={setIsPopupActive} />
            </>}
            <div class="board">
                <div class="board-nav noselect">
                    <button class="board-button"> <span style={{fontSize:"20px", fontWeight:"600"}}>&#43;</span> Create New List</button>
                </div>
                <div class="board-canvas">
                    <div class="board-content noselect">
        
                    {lists.map((list, list_index)=>{
                        return <List  list_id={list.list_id} list_index={list_index} title={list.title} cards={list.cards} background={list.background_color} color={list.font_color} />
                    })}
                    </div>
                </div>
            </div>   
        </>  
    )
}

export default Board

export function List({title, cards, background='ebecf0' , color='323743', list_id, list_index}) {
    const [isCreateActive, setIsCreateActive] = useState(false)
    const [isMoreActive, setIsMoreActive] = useState(false)

    const [fontColor, setFontColor] = useState({enabled:false, color:`#${color}`})
    const [backgroundColor, setBackgroundColor] = useState({enabled:false, color:`#${background}`})

    const handleChangeComplete = (color, event) => {
        handleChangeComplete.setter({enabled:true, color:color.hex})
      };

    const onLongPress = () => {
        console.log("long")
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
                    onChangeComplete={ handleChangeComplete.setter = fontColor.enabled?setFontColor:setBackgroundColor,  handleChangeComplete}
                />
                <span onClick={()=>{
                    fontColor.enabled? setFontColor({...fontColor, enabled:false}): setBackgroundColor({...backgroundColor, enabled:false})  
                }} style={{fontSize:"30px", fontWeight:"600", verticalAlign:'sub', paddingLeft:'10px', cursor: 'pointer' }}>&#215;</span>


            </div>
        }
            <div class="board-list" style={{backgroundColor:backgroundColor.color}}>
                <Menu
                    isOpen={isMoreActive}
                    handleClose={handleClick}
                >
                    <div style={{display:'flex'}} class="test">
                        <MenuItem title={'To The Left'} icon={leftIcon}  action={()=>{ handleClick()}} />
                        <MenuItem title={'To The Right'} icon={rightIcon}  action={()=>{ handleClick()}} />
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
                    <p style={{color:fontColor.color}} class="board-header-title">{title}</p>
                    <img onClick={()=>{setIsMoreActive(true)}} class="more-board-header" width='30px' src={moreIcon}/>
                </div>
                <div class="board-list-content">
                    <CreateCard list_id={list_id} list_index={list_index} handleClose={setIsCreateActive} active={isCreateActive} />
                    
                    {cards.map(card=>{
                     return <Card title={card.title} tags={card.tags} users={card.users} />
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
        <div style={{backgroundColor:background, boxShadow:`0px 0px 3px 1px ${background}`, cursor: 'pointer'}} class={`board-tag-item ${showCancel &&'cancel-tag'}`} >
            <p>{tag_title} {showCancel && <div class='cancel-icon' style={{fontSize:'16px'}}>&#215;</div> }</p>
            
        </div>
    )
}

export function CreateCard({active=false, handleClose, list_id, list_index}) {
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
                    <button class="board-button">Create</button>
                    <button onClick={()=>handleClose(false)} class="board-button border-button-cancel">Cancel</button>
                </div>
                <textarea placeholder="Card Title...." value={title} onInput={(e)=>handleTitle(e)}/>
            </div>
        </div>
    :
    <div onClick={()=>handleClose(true)} class="board-list-card">
        <div class="board-list-card-create">
            <span style={{fontSize:"30px", fontWeight:"600", verticalAlign:'sub', paddingLeft:'10px' }}>&#43;</span> <p>Create New Card</p>
        </div>
    </div>
    
    
}