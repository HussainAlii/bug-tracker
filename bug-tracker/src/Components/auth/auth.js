import { refresh } from "../../utilities";


class Auth{
    constructor(){
        this.authenticated = false
    }

    login(){

        this.authenticated = true;
        if(true){
        refresh()
        }else{
            return true
        }
    }

    logout(){
        this.authenticated = false;
        refresh()
    }

    register(email, password){
        if(false)
            return [true,'Verification link has been sent to your email!', 'success']
        else return [true,'Email Already Exisit!', 'Error']
    }

    isAuth(){
        return this.authenticated
    }
}


export default new Auth()