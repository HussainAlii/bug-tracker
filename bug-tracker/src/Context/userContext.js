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

    const [isDemo, setIsDemo] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(localStorageRetrieve('isCollapsed'))

    function collapse(){
        if(isCollapsed) {localStorageStore('isCollapsed', false); setIsCollapsed(false)}
        else {localStorageStore('isCollapsed', true); setIsCollapsed(true)}
    }
    
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
                        setIsDemo(decoded['user'].type === 'demo')
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

      function loginAsDemoUser(){
        django
        .get(requestAPI.loginAsDemo)
        .then((response) => {
            if (response) {
                let decoded = decodeJWT(response["data"])
                if (decoded["code"]){
                    localStorageStore("jwt", decoded["code"])
                    setUserInfo(decoded["user"])
                    setIsDemo(true)
                    history.push('/')
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
        django
        .post(requestAPI.logout, localStorageRetrieve("jwt"), {headers: {'Content-Type': 'text/plain'}})
        .then((response) => {
            if (response) {
                localStorage.removeItem("jwt")
                localStorage.removeItem("project")
                history.push('/signin/')
                refresh()
            }
        })
        .catch((error) => {
            console.log(error);
        });
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

    function isTokenActive(token){
        const data = {token}
        const encoded = encodeJWT(data)

        return django
        .post(requestAPI.isTokenActive, encoded, {headers: {'Content-Type': 'text/plain'}})
        .then((response) => {
            if (response) {
                let decoded = decodeJWT(response["data"])
                return decoded[0]
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function forgot(email){
        const data = {email}
        const encoded = encodeJWT(data)
        django.post(requestAPI.forgot, encoded, {headers: {'Content-Type': 'text/plain'}})
    }

    function changePassword(token, password){
        const data = {jwt:token, password}
        const encoded = encodeJWT(data)
        django.post(requestAPI.changePassword, encoded, {headers: {'Content-Type': 'text/plain'}})
        logout()
    }

    function changePasswordByToken(token, password){
        const data = {token, password}
        const encoded = encodeJWT(data)
        django.post(requestAPI.changePasswordByToken, encoded, {headers: {'Content-Type': 'text/plain'}})
        logout()
    }

    function changeUsername(jwt, fname, lname){
        const data = {jwt, fname, lname}
        const encoded = encodeJWT(data)
        django.post(requestAPI.changeUsername, encoded, {headers: {'Content-Type': 'text/plain'}})
        refresh()
    }

      return (
        <UserContext.Provider value={{collapse, isCollapsed, login, register, logout, getUserInfo, setUserInfo, isActive, isDemo, verifyCode, forgot, changePassword, changePasswordByToken, isTokenActive, changeUsername, loginAsDemoUser}}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContextProvider