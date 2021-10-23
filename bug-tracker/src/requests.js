import { localStorageStore,  localStorageRetrieve, refresh} from "./utilities";
import {django} from "./axiosRequest"
import axios from "axios";

const requestAPI = {
  login: `/auth/login/`, 
  register: `/auth/register/`, 
};
export default requestAPI;