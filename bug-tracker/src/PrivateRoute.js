import React, {useContext} from 'react'
import { Redirect, Route } from 'react-router'
import Navbar from './Components/Navbar/Navbar'
import Verify from './Components/Sign/Verify';
import { UserContext } from "./Context/userContext";
import { localStorageRetrieve } from './utilities';

function PrivateRoute({ children, ...rest }) {
    const context = useContext(UserContext)
    return (
        <Route
        {...rest}
        render = {() =>{
                if(localStorageRetrieve("jwt")){
                    if(context.isActive)
                        return <><Navbar/>{children}</>                                                           
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