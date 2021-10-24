import django from "../../axiosRequest";
import requestAPI from "../../requests";
import { decodeJWT, encodeJWT, href, localStorageRetrieve, localStorageStore, refresh } from "../../utilities";


class Auth{
    constructor(){
        // this.authenticated = false
    }

    async login(email, password){
        const data = {'email':email, 'password':password}
        const encoded = encodeJWT(data)

        return django
        .post(requestAPI.login, encoded, {headers: {'Content-Type': 'text/plain'}})
        .then((response) => {
            if (response) {
                let decoded = decodeJWT(response["data"])["code"]
                if (decoded){
                    localStorageStore("jwt", decoded)
                    href('/')
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

    logout(){
        // this.authenticated = false;
        localStorage.removeItem("jwt")
        refresh()
    }

    async register(email, password, fname, lname){
        const data = {'email':email, 'password':password, 'fname':fname, 'lname':lname}
        const encoded = encodeJWT(data)

        return django
        .post(requestAPI.register, encoded, {headers: {'Content-Type': 'text/plain'}})
        .then((response) => {
            if (response) {
                let decoded = decodeJWT(response["data"])["code"]
                if (decoded){
                    localStorageStore("jwt", decoded)
                    href('/')
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

    async check_Authorization(){
        let token = localStorageRetrieve("jwt")
        if(token){
            django
            .post(requestAPI.isAuth, token, {headers: {'Content-Type': 'text/plain'}})
            .then((response) => {
                if (response) {
                    if(decodeJWT(response["data"])['0'])
                        href('/')
                }
            })
          }
    }
}


export default new Auth()