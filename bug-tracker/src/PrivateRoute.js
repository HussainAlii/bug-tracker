import React, {useContext, useEffect} from 'react'
import { Redirect, Route } from 'react-router'
import Navbar, { Sidebar } from './Components/Navbar/Navbar'
import Verify from './Components/Sign/Verify';
import { UserContext } from "./Context/userContext";
import { localStorageRetrieve } from './utilities';

function PrivateRoute({title, children, ...rest }) {
    const context = useContext(UserContext)
    useEffect( () => {
        document.title = title;
      },[]);

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
                    return <Redirect to="/signin"/>
                }
            }
        }
        ></Route>
    )
}

export default PrivateRoute