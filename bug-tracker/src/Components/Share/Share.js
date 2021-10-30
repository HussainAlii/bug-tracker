import React, {useEffect, useState} from 'react'
import { useHistory, useParams } from 'react-router';
import { localStorageRetrieve } from '../../utilities';

import removeIcon from "../Icons/remove.svg"

import './Share.css'

import Menu, {MenuItem} from '../Menu/Menu'
import { Button, Checkbox, FormControlLabel, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import django from '../../axiosRequest';
import { getProjectMember } from '../../requests';

function Share({title}) {
    const history = useHistory()
    const {id} = useParams();

    const [email, setEmail] = useState("")
    const [inviteLink, setInviteLink] = useState("s")

    const [members, setMembers] = useState([])

    function removeMember(user_id){
        console.log(user_id)
    }

    function handleInvite(){
        console.log(email)
    }
    
    useEffect( () => {
        document.title = title;
        !localStorageRetrieve("project") || localStorageRetrieve("project") != id &&history.push("/")
        
        getProjectMember(id).then(res =>{setMembers(res['members']); setInviteLink(res["invite_id"])})
    },[]);

    return (
        <div style={{paddingBottom:"1px"}}>
            <div className="project-setting">

                <div class="setting-form">
                    <h3 style={{color:"gray", textAlign:"center", paddingRight:'33px'}}>Invite To The Project</h3>
                    
                    <div style={{marginTop:"50px"}} className="form-item">
                        <p>Invite with link:</p>
                        {inviteLink?
                        <p>{window.location.hostname}/invite/{id}/{inviteLink}/ </p>:
                        <p style={{color:'#f50057'}}>Turned off from Project Setting</p>
                        }
                        <hr/>
                    </div>

                    <div style={{marginTop:"50px", display:"flex"}} className="form-item">
                        <input style={{marginRight:"30px"}} value={email} onChange={(e)=>{
                                setEmail(e.target.value)
                            }} />
                        <label className={email&&'vaild'}>Enter User Email...</label>
                        <button onClick={handleInvite}>Invite</button>
                    </div>

                    {members.length != 0 && <div class='table-share'><TableHead>

                        <TableRow>
                            <TableCell>
                            Can Modify
                            </TableCell>

                            <TableCell>
                            Name
                            </TableCell>

                            <TableCell>
                            Remove
                            </TableCell>
                        </TableRow>
                        
                    </TableHead>
                    <TableBody>
                        {members.map(member =>{
                            return <>
                        <TableRow>
                            <TableCell>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={member.can_modify}
                                        onChange={(e)=>{console.log(e.target.value)}}
                                    />
                                }/>
                            </TableCell>

                            <TableCell>
                            {member.name}
                            </TableCell>

                            <TableCell>
                            <img style={{cursor: 'pointer'}} src={removeIcon} title={"Exit Project"} onClick={()=>removeMember(member.id)} />
                            </TableCell>
                        </TableRow>
                        </>})}

                    </TableBody></div>}

                </div>
                
            </div>
        </div>
    )
}

export default Share
