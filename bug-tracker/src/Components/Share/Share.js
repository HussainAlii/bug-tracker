import React, {useEffect, useState, useContext} from 'react'
import { useHistory, useParams } from 'react-router';
import { decodeJWT, getRandomInt, isValidEmail, localStorageRetrieve } from '../../utilities';

import removeIcon from "../Icons/remove.svg"
import disabledRemove from "../Icons/disabledRemove.svg"
import linkIcon from "../Icons/link.svg"
import './Share.css'

import Menu, {MenuItem} from '../Menu/Menu'
import { Button, Checkbox, FormControlLabel, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import django from '../../axiosRequest';
import { getProjectMember, inviteMember, removeMember, setUserPermission, setUserRank } from '../../requests';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import {ProjectContext} from "../../Context/projectContext";

function Share({title}) {
    const context = useContext(ProjectContext)

    const history = useHistory()
    const {id} = useParams();

    const [email, setEmail] = useState("")
    const [inviteLink, setInviteLink] = useState("s")

    const [members, setMembers] = useState([])
    const [showMessage, setShowMessage] = useState([false,"",""]);

    function handleInvite(){
        inviteMember(id, email).then(res =>setShowMessage(res || [false,"",""]))
    }
    
    useEffect( () => {
        document.title = title;
        context.isAccessAllowed(id)
        context.getProjectInfo().projectRank !='superAdmin' || context.getProjectInfo().projectRank !='admin' && history.push("/")

        !localStorageRetrieve("project") && localStorageRetrieve("project") != id && history.push("/")

        getProjectMember(id).then(res =>{setMembers(res['members']); setInviteLink(res["invite_id"])})
    },[]);

    return (
        <div style={{paddingBottom:"1px"}}>
            <div class="alert-message">
            {showMessage[0]&&
            <Alert style={{width:'90%'}} severity={showMessage[2]}>
            <AlertTitle>{showMessage[2].charAt(0).toUpperCase()+showMessage[2].slice(1)}</AlertTitle>
            <strong>{showMessage[1]}</strong>
          </Alert>
          }
            </div>
            <div className="project-setting">

                <div style={{paddingLeft:"20px", paddingRight:"55px"}} class="setting-form">
                    <h3 style={{color:"gray", textAlign:"center", paddingRight:'33px'}}>Invite To The Project</h3>
                    
                    <div style={{marginTop:"50px"}} className="form-item">
                        <p>Invite with link:</p>
                        {inviteLink?
                        <><img title="Copy To Clipboard" onClick={()=>{navigator.clipboard.writeText(`${window.location.hostname}/invite/${id}/${inviteLink}/`)}} src={linkIcon} style={{width:"18px", marginRight:'3px', verticalAlign:"middle", cursor: 'pointer', }} /> <span>{window.location.hostname}/invite/{id}/{inviteLink}/ </span></> :
                        <p style={{color:'#f50057'}}>This Feature Is Turned off from Project Setting!</p>
                        }
                        <hr/>
                    </div>

                    <div style={{marginTop:"50px", display:"flex"}} className="form-item">
                        <input style={{marginRight:"30px"}} value={email} onChange={(e)=>{
                                setEmail(e.target.value)
                            }} />
                        <label className={email&&'vaild'}>Enter User Email...</label>
                        <button disabled={!isValidEmail(email)} onClick={handleInvite}>Invite</button>
                    </div>

                    {members.length != 0 && <div class='table-share'><TableHead>

                        <TableRow>
                            <TableCell>
                            PFP
                            </TableCell>

                            <TableCell>
                            Name
                            </TableCell>

                            <TableCell>
                            Can Modify Board
                            </TableCell>

                            <TableCell>
                            Admin
                            </TableCell>

                            <TableCell>
                            Remove
                            </TableCell>
                        </TableRow>
                        
                    </TableHead>
                    <TableBody>
                        {members.map((member, i) =>{
                            let user_id = decodeJWT(localStorageRetrieve("jwt"))["email"];

                            return <>
                        <TableRow key={member.id}>
                            <TableCell>
                            <div class="avatar noselect"><div class="img" style={{backgroundColor: `rgb(${getRandomInt(125)},${getRandomInt(125)},${getRandomInt(125)})`}} ><div class="chars">{member.name[0]?.toUpperCase()}{member.name[member.name.indexOf(' ')+1]?.toUpperCase()}</div></div></div>
                            </TableCell>

                            <TableCell>
                            {member.name}
                            </TableCell>

                            <TableCell>
                            <FormControlLabel
                                control={
                                    
                                    <Checkbox
                                        disabled = {member.id == user_id}
                                        checked={members[i].can_modify}
                                        onChange={(e)=>{
                                           let checked =  e.target.checked;
                                           let members_arr = [...members]
                                           members_arr[i] = {...member,can_modify:checked}
                                           setMembers(members_arr);
                                           setUserPermission(id, member.id, checked)
                                        }}
                                    />
                                }/>
                            </TableCell>

                            <TableCell>
                            <FormControlLabel
                                control={
                                    
                                    <Checkbox
                                        disabled = {member.id == user_id}
                                        checked={members[i].rank == 'admin'}
                                        onChange={(e)=>{
                                           let checked =  e.target.checked;
                                           let value = checked? 'admin': 'member'
                                           let members_arr = [...members]
                                           members_arr[i] = {...member,rank:value}
                                           setMembers(members_arr);
                                           setUserRank(id, member.id, value)
                                        }}
                                    />
                                }/>
                            </TableCell>

                            <TableCell>
                            {member.id != user_id ? <img style={{cursor: 'pointer'}} src={removeIcon} title={"Remove User"} onClick={()=>{ removeMember(id, member.id);}} />:<img style={{cursor: 'not-allowed'}} src={disabledRemove} />}
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
