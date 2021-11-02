import React, {useEffect, useContext, useState} from 'react'
import { useHistory, useParams } from 'react-router';
import { getRandomInt, localStorageRetrieve } from '../../utilities';
import './Board.css'

import icon from '../Icons/logo.png'
import moreIcon from '../Icons/more.svg'

import {ProjectContext} from "../../Context/projectContext";

function Board({title}) {
    const context = useContext(ProjectContext)

    const history = useHistory()
    const {id} = useParams();
    
    useEffect( () => {
        document.title = title;
        context.isAccessAllowed(id)
    },[]);
    
    let tags_ex = [{background:'dodgerblue', title:'tag'},]
    let users_ex = [{name:'HU', fullName:"Hussain Ali"},]
    let cards=[{title:"this is a title", tags:tags_ex, users:users_ex},]
    let lists=[{title:'To DO', background_color:'ebecf0', font_color:'323743', cards:cards}]
    
    return (
            <div class="board">
                <div class="board-nav noselect">
                    <button class="board-button"> <span style={{fontSize:"20px", fontWeight:"600"}}>&#43;</span> Create New List</button>
                </div>
                <div class="board-canvas">
                    <div class="board-content noselect">
      
                    {lists.map(list=>{
                        return <List title={list.title} cards={list.cards} background={list.background_color} color={list.font_color} />
                    })}
                    </div>
                </div>
            </div>     
    )
}

export default Board

export function List({title, cards, background='ebecf0' , color='323743'}) {
    const [isCreateActive, setIsCreateActive] = useState(false)
    
        return (
        <div class="board-list-wrapper">
            <div class="board-list" style={{backgroundColor:`#${background}`}}>
                <div class="board-list-header">
                    <p style={{color:`#${color}`}} class="board-header-title">{title}</p>
                    <img class="more-board-header" width='30px' src={moreIcon}/>
                </div>
                <div class="board-list-content">
                    <CreateCard handleClose={setIsCreateActive} active={isCreateActive} />
                    
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

export function Tag({background, tag_title}) {
    return (
        <div style={{backgroundColor:background, boxShadow:`0px 0px 3px 1px ${background}`}} class="board-tag-item">
            <p>{tag_title}</p>
        </div>
    )
}

export function CreateCard({active=false, handleClose}) {
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