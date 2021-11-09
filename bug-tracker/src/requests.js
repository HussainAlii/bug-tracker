import { localStorageStore,  localStorageRetrieve, refresh, encodeJWT, href, decodeJWT} from "./utilities";
import {django} from "./axiosRequest"
import axios from "axios";

const requestAPI = {
  login: `/auth/login/`, 
  register: `/auth/register/`, 
  isAuth: `/auth/isAuth/`, 
  verify: `/auth/verifyCode/`, 
  forgot: `/auth/forgot/`, 
  changeUsername: '/auth/changeUsername/',
  changePasswordByToken: `/auth/changePasswordByToken/`, 
  changePassword: `/auth/changePasswordByEmail/`, 
  isTokenActive: `/auth/isTokenActive/`, 
  createProject: '/bugtracker/createProject/',
  getProjects: '/bugtracker/getProjects/',
  getProject: '/bugtracker/getProject/',
  updateProject: '/bugtracker/updateProject/',
  deleteProject: '/bugtracker/deleteProject/',
  getProjectMember:'/bugtracker/getProjectMember/',
  inviteMember:'/bugtracker/inviteMember/',
  removeMember:'/bugtracker/removeMember/',
  setUserPermission:'/bugtracker/setUserPermission/',
  setUserRank:'/bugtracker/setUserRank/',
  joinInvite:'/bugtracker/joinInvite/',
  isAccessAllowed:'/bugtracker/isAccessAllowed/',
  isProjectPublic:'/bugtracker/isProjectPublic/',
  leaveProject:'/bugtracker/leaveProject/',
  createNewList:'/bugtracker/createNewList/',
  getProjectLists:'/bugtracker/getProjectLists/',
  changeListTitle:'/bugtracker/changeListTitle/',
  changeTextArea:'/bugtracker/changeCardText/',
  createNewCard:'/bugtracker/createNewCard/',
  changeListColor:'/bugtracker/changeListColor/',
  deleteList:'/bugtracker/removeList/',
  deleteCard:'/bugtracker/removeCard/',
  sendListTo:'/bugtracker/sendListTo/',
  loadPopup:'/bugtracker/loadPopup/',
  removeMemberFromCard:'/bugtracker/removeMemberFromCard/',
  addMemberToCard:'/bugtracker/addMemberToCard/',
  removeTagFromCard:'/bugtracker/removeTagFromCard/',
  addTagToCard:'/bugtracker/addTagToCard/',
  createNewTag:'/bugtracker/createNewTag/',
  sendCardTo:'/bugtracker/sendCardTo/',
  removeTag:'/bugtracker/removeTag/',
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

export function joinInvite(project_id, invite_id, user_id){
  const data = {jwt:localStorageRetrieve("jwt"),project_id, invite_id, user_id}
  const encoded = encodeJWT(data)

  return django
  .post(requestAPI.joinInvite, encoded, {headers: {'Content-Type': 'text/plain'}})
  .then( res => {
          href('/projects')
  })
  .catch((error) => {
      console.log(error);
  });
}

export function leaveProject(){
  const data = {jwt:localStorageRetrieve("jwt"),project_id:localStorageRetrieve('project')}
  const encoded = encodeJWT(data)

  return django
  .post(requestAPI.leaveProject, encoded, {headers: {'Content-Type': 'text/plain'}})
  .then( res => {
          localStorage.removeItem('project')
          href('/projects')
  })
  .catch((error) => {
      console.log(error);
  });
}

export function getProjectMember(project_id){
  const data = {jwt:localStorageRetrieve("jwt"),project_id}
  const encoded = encodeJWT(data)

  return django
  .post(requestAPI.getProjectMember, encoded, {headers: {'Content-Type': 'text/plain'}})
  .then((response) => {
        if (response) {
          let decoded = decodeJWT(response["data"])
          if (decoded){
            return decoded
          }
        }
  })
  .catch((error) => {
      console.log(error);
  });
}

export function setUserPermission(project_id, user_id, value){
  const data = {jwt:localStorageRetrieve("jwt"),project_id, user_id, value}
  const encoded = encodeJWT(data)

  return django
  .post(requestAPI.setUserPermission, encoded, {headers: {'Content-Type': 'text/plain'}})
  .then((response) => {
        
  })
  .catch((error) => {
      console.log(error);
  });
}

export function setUserRank(project_id, user_id, value){
  const data = {jwt:localStorageRetrieve("jwt"),project_id, user_id, value}
  const encoded = encodeJWT(data)

  return django
  .post(requestAPI.setUserRank, encoded, {headers: {'Content-Type': 'text/plain'}})
  .then((response) => {
        
  })
  .catch((error) => {
      console.log(error);
  });
}

export function inviteMember(project_id, user_id){
  const data = {jwt:localStorageRetrieve("jwt"),user_id, project_id}
  const encoded = encodeJWT(data)

  return django
  .post(requestAPI.inviteMember, encoded, {headers: {'Content-Type': 'text/plain'}})
  .then((response) => {
        if (response) {
          let decoded = decodeJWT(response["data"])
          if (decoded){
            return decoded
          }else{
            refresh()
          }
        }
  })
  .catch((error) => {
      console.log(error);
  });
}

export function removeMember(project_id, user_id){
  const data = {jwt:localStorageRetrieve("jwt"),user_id, project_id}
  const encoded = encodeJWT(data)

  return django
  .post(requestAPI.removeMember, encoded, {headers: {'Content-Type': 'text/plain'}})
  .then((response) => {
        if (response) {
          refresh()
        }
  })
  .catch((error) => {
      console.log(error);
  });
}

export function updateProject(title, description, access, allow_invitationLink){
  const data = {jwt:localStorageRetrieve("jwt"),project_id:localStorageRetrieve('project'), access, title, description, allow_invitationLink}
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
          href("/projects")
      }
  })
  .catch((error) => {
      console.log(error);
  });
}

export function getProjectLists(project_id){
  const data = {jwt:localStorageRetrieve("jwt"),project_id}
  const encoded = encodeJWT(data)

  return django
  .post(requestAPI.getProjectLists, encoded, {headers: {'Content-Type': 'text/plain'}})
  .then((response) => {
        if (response) {
          let decoded = decodeJWT(response["data"])
          if (decoded){
            return decoded
          }
        }
  })
  .catch((error) => {
      console.log(error);
  });
}

export function changeListColorReq(type, list_id, color){
  const data = {jwt:localStorageRetrieve("jwt"),list_id, type, color}
  const encoded = encodeJWT(data)

  return django
  .post(requestAPI.changeListColor, encoded, {headers: {'Content-Type': 'text/plain'}})
  .catch((error) => {
      console.log(error);
  });
}

export function deleteListReq(project_id, list_id){
  const data = {project_id, list_id}
  const encoded = encodeJWT(data)

  return django
  .post(requestAPI.deleteList, encoded, {headers: {'Content-Type': 'text/plain'}})
  .catch((error) => {
      console.log(error);
  });
}

export function deleteCardReq(list_id, card_id){
  const data = {jwt:localStorageRetrieve("jwt"),list_id, card_id}
  const encoded = encodeJWT(data)

  return django
  .post(requestAPI.deleteCard, encoded, {headers: {'Content-Type': 'text/plain'}})
  .catch((error) => {
      console.log(error);
  });
}

export function sendListToReq(list_id, to_list_id, project_id, is_reversed){
  const data = {jwt:localStorageRetrieve("jwt"),list_id, to_list_id, project_id, is_reversed}
  const encoded = encodeJWT(data)

  return django
  .post(requestAPI.sendListTo, encoded, {headers: {'Content-Type': 'text/plain'}})
  .catch((error) => {
      console.log(error);
  });
}

export function sendCardToReq(position, list_id, to_id, card_id, project_id, is_reversed){
  const data = {position,list_id, to_id, card_id, project_id, is_reversed}
  const encoded = encodeJWT(data)

  return django
  .post(requestAPI.sendCardTo, encoded, {headers: {'Content-Type': 'text/plain'}})
  .catch((error) => {
      console.log(error);
  });
}

export function loadPopup(project_id){
  const data = {jwt:localStorageRetrieve("jwt"),project_id}
  const encoded = encodeJWT(data)

  return django
  .post(requestAPI.loadPopup, encoded, {headers: {'Content-Type': 'text/plain'}})
  .then((res) => {
    let popup = decodeJWT(res['data'])['popup']
    return popup
  })
  .catch((error) => {
      console.log(error);
  });
}