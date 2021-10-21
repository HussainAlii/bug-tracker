import React from 'react'
import './Menu.css'
import MenuItem from './MenuItem'
import logoutIcon from '../Icons/logout.svg'
import settingIcon from '../Icons/setting.svg'
function Menu({isOpen, handleClick}) {
    
        return( 
            <>
                <div className={`menu ${isOpen? 'active': 'inactive'}`}>
                    <MenuItem title='Setting' icon={settingIcon} action={()=>{alert("Setting")}} />
                    <MenuItem title='Logout' icon={logoutIcon} action={()=>{alert("Logout")}} />
                </div>
                {isOpen&&<div className="back" />}
            </>
        )}

export default Menu
