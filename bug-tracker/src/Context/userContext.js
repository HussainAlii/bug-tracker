import React, { useState, useEffect, createContext,useContext } from "react";
export const UserContext = createContext();

function UserContextProvider({ children }) {

    useEffect(async () => {

    },[]);


      return (
        <UserContext.Provider value={{}}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContextProvider

    // const [isAuth, setIsAuth] = useState(false);
    // function login(){
    //   setIsAuth(true)
    // }

    // function logout(){
    //   setIsAuth(false)
    // }
    //auth:{isAuth, login, logout},