import React, {useContext} from 'react'
import { Redirect, Route } from 'react-router'
import Navbar from './Components/Navbar/Navbar'
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
                        return <><Navbar/><div>verify</div></>    
                }else{
                    return <Redirect to="/signin"/>
                }
            }
        }
        ></Route>
    )
}

export default PrivateRoute