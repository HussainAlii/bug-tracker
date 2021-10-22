import React, {useContext} from 'react'
import { Redirect, Route } from 'react-router'
import Navbar from './Components/Navbar/Navbar'
import auth from './Components/auth/auth'
function PrivateRoute({ children, ...rest }) {
    return (
        <Route
        {...rest}
        render = {props =>{
            // if(context.auth.isAuth){ //is auth
            if(auth.isAuth()){ //is auth

                return (
                    <>
                        <Navbar/>
                        {children}
                    </>
                    )
            }
            else return <Redirect to="/signin"/>
        }}
        ></Route>
    )
}

export default PrivateRoute
