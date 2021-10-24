import { localStorageStore,  localStorageRetrieve, refresh} from "./utilities";
import {django} from "./axiosRequest"
import axios from "axios";

const requestAPI = {
  login: `/auth/login/`, 
  register: `/auth/register/`, 
  isAuth: `/auth/isAuth/`, 
  verify: `/auth/verifyCode/`, 
  forgot: `/auth/forgot/`, 
  changePassword: `/auth/changePassword/`, 
  isTokenActive: `/auth/isTokenActive/`, 
};
export default requestAPI;