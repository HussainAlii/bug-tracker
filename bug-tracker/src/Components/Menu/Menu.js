import React, {Children, useContext} from 'react'
import './Menu.css'

function Menu({isOpen, handleClose, children, height='auto'}) {
        return( 
            <>
                <div style={{height:height}} className={`menu ${isOpen? 'active': 'inactive'}`}>
                    {children}
                </div>
                {isOpen&&<div onClick={handleClose} className="back" />}
            </>
        )}

export default Menu

export function MenuItem({icon, title, action, events={}}) {
    
    return (
        <dev events class="menu-item" onClick={()=>{action();}} >
            <img src={icon} />
            <p>{title}</p>
        </dev>
    )
}