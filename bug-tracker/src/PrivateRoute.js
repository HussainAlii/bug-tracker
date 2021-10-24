import React from 'react'
import { Redirect, Route } from 'react-router'
import Navbar from './Components/Navbar/Navbar'

function PrivateRoute({ children, isAuth, ...rest }) {
    return (
        <Route
        {...rest}
        render = {() =>{
            console.log(isAuth)
                if(isAuth){
                    if(isAuth == 2)
                        return <><Navbar/><div>verify</div></>    
                    else 
                        return <><Navbar/>{children}</>                                                           
                }else{
                    return <Redirect to="/signin"/>
                }
            }
        }
        ></Route>
    )
}

export default PrivateRoute