import React from 'react'
import './Card.css'
import privateIcon from "../Icons/private.svg"
import publicIcon from "../Icons/public.svg"
import userIcon from "../Icons/user.png"
function Card({title, desc="", users=[], action, access}) {
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
                    <img src={userIcon} />
                    {users.map(user=>{
                    return <img src={user.photo? user.photo : userIcon} />
                    })}
                </div>
                <p>{(users.length) + 1}</p>
            </div>
        </div>
    </div>
    );
}

export default Card
