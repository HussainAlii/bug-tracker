import React, {useContext, useEffect} from 'react'
import { Redirect, Route } from 'react-router'
import Navbar, { Sidebar, SignNavbar } from './Components/Navbar/Navbar'
import Verify from './Components/Sign/Verify';
import { UserContext } from "./Context/userContext";
import { localStorageRetrieve } from './utilities';

function BoardRoute({children, ...rest }) {
    const context = useContext(UserContext)

    return (
        <Route
        {...rest}
        render = {() =>{
                if(localStorageRetrieve("jwt")){
                    if(context.isActive)
                        return <><Navbar/>
                        <div className="container">
                            <Sidebar/><div className="children">{children}</div>
                            </div></>                                                           
                    else 
                        return <><Navbar/><Verify/></>    
                }else{
                    return <><SignNavbar/>
                    <div className="container">
                        <div style={{left: '1px', width:'100vh'}} className="children">{children}</div>
                        </div></>   
                }
            }
        }
        ></Route>
    )
}

export default BoardRoute