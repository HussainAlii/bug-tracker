import React, {useEffect, useState} from 'react'
import { useHistory, useParams } from 'react-router';
import { localStorageRetrieve } from '../../utilities';

import cancelIcon from "../Icons/cancel.svg"

import './Share.css'

import Menu, {MenuItem} from '../Menu/Menu'
import { Button, Checkbox, FormControlLabel, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

function Share({title}) {
    const history = useHistory()
    const {id} = useParams();

    const [email, setEmail] = useState("")
    const [inviteLink, setInviteLink] = useState("s")

    const [members, setMembers] = useState([])

    function removeMember(user_id){
        console.log(user_id)
    }
    
    useEffect( () => {
        document.title = title;
        !localStorageRetrieve("project") || localStorageRetrieve("project") != id &&history.push("/")
      },[]);

    return (
        <div style={{paddingBottom:"1px"}}>
            <div className="project-setting">

                <div class="setting-form">
                    <h3 style={{color:"gray", textAlign:"center", paddingRight:'33px'}}>Invite To The Project</h3>
                    
                    {inviteLink && <div style={{marginTop:"50px"}} className="form-item">
                        <p>Invite with link:</p>
                        <p>{window.location.hostname}/invite/{id}/{inviteLink}/ </p>
                        <hr/>
                    </div>}

                    <div style={{marginTop:"50px", display:"flex"}} className="form-item">
                        <input style={{marginRight:"30px"}} value={email} onChange={(e)=>{
                                setEmail(e.target.value)
                            }} />
                        <label className={email&&'vaild'}>User Email:</label>
                        <button>Invite</button>
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
                            <img style={{cursor: 'pointer'}} src={cancelIcon} title={"Exit Project"} onClick={()=>removeMember(member.id)} />
                            </TableCell>
                        </TableRow>
                        })}

                    </TableBody></div>}

                </div>
                
            </div>
        </div>
    )
}

export default Share
