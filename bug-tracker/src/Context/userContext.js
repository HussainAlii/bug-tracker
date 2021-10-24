import React, { useState, useEffect, createContext,useContext } from "react";
import { useHistory } from "react-router";
import django from "../axiosRequest";

import requestAPI from "../requests";
import { decodeJWT, encodeJWT, localStorageRetrieve, localStorageStore, refresh } from "../utilities";
export const UserContext = createContext();

function UserContextProvider({ children }) {
    const history = useHistory()
    
    const [fname, setFname] = useState("")  
    const [lname, setLname] = useState("")  
    const [photoUrl, setPhotoUrl] = useState("")
    const [isActive, setIsActive] = useState(true)
    
    function setUserInfo(data){
        setFname(data['fname'])
        setLname(data['lname'])
        setPhotoUrl(data['photoUrl'])
        setIsActive(data['isActive'])
    }

    
    function getUserInfo(){
        return {fname,lname,photoUrl}
    }

    useEffect(async () => {
        if(localStorageRetrieve("jwt")){
                django
                .post(requestAPI.isAuth, localStorageRetrieve("jwt"), {headers: {'Content-Type': 'text/plain'}})
                .then((response) => {
                    if (response) {
                        let decoded = decodeJWT(response["data"])
                        if(!decoded['0'])
                            logout()
                        setUserInfo(decoded['user'])
                    }
                })
                .catch((e)=>{
                    logout()
                })
        }
      },[]);

      function login(email, password){
        const data = {'email':email, 'password':password}
        const encoded = encodeJWT(data)

        return django
        .post(requestAPI.login, encoded, {headers: {'Content-Type': 'text/plain'}})
        .then((response) => {
            if (response) {
                let decoded = decodeJWT(response["data"])
                if (decoded["code"]){
                    localStorageStore("jwt", decoded["code"])
                    setUserInfo(decoded["user"])
                    history.push('/')
                }
                else{
                    localStorage.removeItem('jwt');
                    return decodeJWT(response["data"])
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function verifyCode(code){
        const data = {jwt:localStorageRetrieve("jwt"),code}
        const encoded = encodeJWT(data)

        return django
        .post(requestAPI.verify, encoded, {headers: {'Content-Type': 'text/plain'}})
        .then((response) => {
            if (response) {
                let decoded = decodeJWT(response["data"])
                if(decoded['0'])
                    refresh()
                else
                    return [true,'Invalid code!','error']
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function logout(){
        // this.authenticated = false;
        localStorage.removeItem("jwt")
        history.push('/signin/')
    }

    function register(email, password, fname, lname){
        const data = {'email':email, 'password':password, 'fname':fname, 'lname':lname}
        const encoded = encodeJWT(data)

        return django
        .post(requestAPI.register, encoded, {headers: {'Content-Type': 'text/plain'}})
        .then((response) => {
            if (response) {
                let decoded = decodeJWT(response["data"])["code"]
                if (decoded){
                    localStorageStore("jwt", decoded)
                    refresh()
                }
                else{
                    localStorage.removeItem('jwt');
                    return decodeJWT(response["data"])
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

      return (
        <UserContext.Provider value={{login, register, logout, getUserInfo, setUserInfo, isActive, verifyCode}}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContextProvider