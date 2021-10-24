import React, {useContext} from 'react'
import './Menu.css'
import MenuItem from './MenuItem'
import logoutIcon from '../Icons/logout.svg'
import settingIcon from '../Icons/setting.svg'
import { UserContext } from "../../Context/userContext";

function Menu({isOpen, handleClick}) {
        const context = useContext(UserContext)
        return( 
            <>
                <div className={`menu ${isOpen? 'active': 'inactive'}`}>
                    <MenuItem title='Setting' icon={settingIcon} action={()=>{alert("Setting")}} />
                    <MenuItem title='Logout' icon={logoutIcon} action={()=>{context.logout()}} />
                </div>
                {isOpen&&<div className="back" />}
            </>
        )}

export default Menu
