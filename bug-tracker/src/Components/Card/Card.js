import React, {useContext} from 'react'
import './Card.css'
import privateIcon from "../Icons/private.svg"
import publicIcon from "../Icons/public.svg"
import { getRandomInt } from '../../utilities'
import { UserContext } from '../../Context/userContext'

function Card({title, desc="", users=[], action, access}) {
    const context = useContext(UserContext)

    return (
        <div class="card">
        <div class="card-model noselect" onClick={action}>
            <div class="card-header">
                <h3>{title}</h3>
                {access? <img src={publicIcon}/> : <img src={privateIcon} />}
            </div>
            <div className="card-body">
            <div class="card-desc">
                    <p>{desc}</p>
                </div>
            </div>
            <div class="card-footer">
                <div class="users">
                    <div class="avatar">
                        {/* super admin profile pic */}
                        <div class="img" style={{width: '28px', height:'28px', fontSize:'13px', marginRight:'1px',backgroundColor: `rgb(${getRandomInt(125)},${getRandomInt(125)},${getRandomInt(125)})`}} >
                            <div class="chars">{context.getUserInfo().fname[0]?.toUpperCase()}{context.getUserInfo().lname[0]?.toUpperCase()}</div>
                        </div>

                        {/* members profile pic */}
                        {users.map(user=>{
                        return (
                            <div class="img" style={{width: '28px', height:'28px', fontSize:'13px', marginRight:'1px',backgroundColor: `rgb(${getRandomInt(125)},${getRandomInt(125)},${getRandomInt(125)})`}} >
                                <div class="chars">{user}</div>
                            </div>
                        );
                        })}
                    </div>
                </div>
                <p>{(users.length) + 1}</p>
            </div>
        </div>
    </div>
    );
}

export default Card
