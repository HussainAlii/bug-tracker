import React from 'react'
import './Menu.css'

function MenuItem({icon, title, action}) {
    
    return (
        <dev class="menu-item" onClick={()=>{action();}} >
            <img src={icon} />
            <p>{title}</p>
        </dev>
    )
}

export default MenuItem
