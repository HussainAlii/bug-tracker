import React, { useState, useEffect, createContext,useContext } from "react";
import { useHistory } from "react-router";
import django from "../axiosRequest";

import requestAPI from "../requests";
import { decodeJWT, encodeJWT, localStorageRetrieve, localStorageStore, refresh } from "../utilities";
export const ProjectContext = createContext();

function ProjectContextProvider({ children }) {
    const history = useHistory()

    const [projectTitle, setProjectTitle] = useState("")  
    const [projectRank, setProjectRank] = useState("")  
    const [projectCanModify, setProjectCanModify] = useState(false)  
   
    function setProjectInfo(data){
        setProjectTitle(data['project_title'])
        setProjectRank(data['project_rank'])
        setProjectCanModify(data['project_can_modify'])
    }

    
    function getProjectInfo(){
        return {projectTitle, projectRank, projectCanModify}
    }
    
    
    function openProject(id){
        localStorageStore("project", id)
        isAccessAllowed(id)
        history.push(`/${id}/Board`)
    }

    function isAccessAllowed(project_id){
            const data = {jwt:localStorageRetrieve("jwt"),project_id}
            const encoded = encodeJWT(data)
                django
                .post(requestAPI.isAccessAllowed, encoded, {headers: {'Content-Type': 'text/plain'}})
                .then((response) => {
                    if (response) {
                        let decoded = decodeJWT(response["data"])
                        if(decoded && decoded['0'] == false || decoded == undefined)
                            closeProject()
                        else
                            setProjectInfo(decoded['project'])
                    }
                })
                .catch(e=>{
                    closeProject()
                })
    }
    
    useEffect(() => {
        localStorageRetrieve("project") && isAccessAllowed(localStorageRetrieve("project"))
      },[]);

    

    function closeProject(){
        localStorage.removeItem("project")
        history.push("/projects")
      }

   

      return (
        <ProjectContext.Provider value={{getProjectInfo, setProjectInfo, openProject, closeProject, isAccessAllowed }}>
            { children }
        </ProjectContext.Provider>
    )
}

export default ProjectContextProvider