import django from "../../axiosRequest";
import requestAPI from "../../requests";
import { decodeJWT, encodeJWT, refresh } from "../../utilities";


class Auth{
    constructor(){
        this.authenticated = false
    }

    login(){

        this.authenticated = true;
        if(false){
        refresh()
        }else{
            return [true,'Email or Password is incorrect.', 'error']
            return [true,'Account has not been verified yet!', 'error']
        }
    }

    logout(){
        this.authenticated = false;
        refresh()
    }

    register(email, password, fname, lname){
        const data = {'email':email, 'password':password, 'fname':fname, 'lname':lname}
        const encoded = encodeJWT(data)

        return django
        .post(requestAPI.register, encoded, {headers: {'Content-Type': 'text/plain'}})
        .then((response) => {
            if (response) {
                return decodeJWT(response["data"])
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    isAuth(){
        return this.authenticated
    }
}


export default new Auth()