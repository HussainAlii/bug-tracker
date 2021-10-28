import { localStorageStore,  localStorageRetrieve, refresh, encodeJWT, href} from "./utilities";
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
  getProject: '/bugtracker/getProject/',
  updateProject: '/bugtracker/updateProject/',
  deleteProject: '/bugtracker/deleteProject/',
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

export function updateProject(title, description, access){
  const data = {jwt:localStorageRetrieve("jwt"),project_id:localStorageRetrieve('project'), access, title, description}
  const encoded = encodeJWT(data)

  return django
  .post(requestAPI.updateProject, encoded, {headers: {'Content-Type': 'text/plain'}})
  .then((response) => {
      if (response) {
          refresh()
      }
  })
  .catch((error) => {
      console.log(error);
  });
}

export function deleteProject(){


  const data = {jwt:localStorageRetrieve("jwt"),project_id:localStorageRetrieve('project')}
  const encoded = encodeJWT(data)

  return django
  .post(requestAPI.deleteProject, encoded, {headers: {'Content-Type': 'text/plain'}})
  .then((response) => {
      if (response) {
        localStorage.removeItem("project")
        localStorage.removeItem("project_title")
          href("/projects")
      }
  })
  .catch((error) => {
      console.log(error);
  });
}