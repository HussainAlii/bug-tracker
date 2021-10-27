import { localStorageStore,  localStorageRetrieve, refresh, encodeJWT} from "./utilities";
import {django} from "./axiosRequest"
import axios from "axios";

const requestAPI = {
  login: `/auth/login/`, 
  register: `/auth/register/`, 
  isAuth: `/auth/isAuth/`, 
  verify: `/auth/verifyCode/`, 
  forgot: `/auth/forgot/`, 
  changePasswordByToken: `/auth/changePasswordByToken/`, 
  changePasswordByEmail: `/auth/changePasswordByEmail/`, 
  isTokenActive: `/auth/isTokenActive/`, 
  createProject: '/bugtracker/createProject/',
  getProjects: '/bugtracker/getProjects/',
};
export default requestAPI;

export function createProject(title, description, access){
  const data = {jwt:localStorageRetrieve("jwt"),title, description, access}
  const encoded = encodeJWT(data)

  return django
  .post(requestAPI.createProject, encoded, {headers: {'Content-Type': 'text/plain'}})
  .then((response) => {
      if (response) {
          refresh()
      }
  })
  .catch((error) => {
      console.log(error);
  });
}