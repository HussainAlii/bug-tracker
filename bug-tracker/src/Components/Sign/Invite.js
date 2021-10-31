import React, {useEffect, useContext} from 'react'
import { useHistory, useParams } from 'react-router';
import { joinInvite } from '../../requests';
import { UserContext } from "../../Context/userContext";
import { decodeJWT, localStorageRetrieve } from '../../utilities';

function Invite({title}) {
    const history = useHistory()
    const {id, invite_id} = useParams();
    
    useEffect( () => {
        document.title = title;
        let user_id = decodeJWT(localStorageRetrieve('jwt'))["email"]
        joinInvite(id, invite_id, user_id)     
    },[]);

    return (
        <div>
            
        </div>
    )
}

export default Invite
