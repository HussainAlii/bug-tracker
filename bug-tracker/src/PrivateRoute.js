import React from 'react'
import { Redirect, Route } from 'react-router'
import Navbar from './Components/Navbar/Navbar'

function PrivateRoute({ children, ...rest }) {
    return (
        <Route
        {...rest}
        render = {props =>{
            if(false){ //is auth
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
