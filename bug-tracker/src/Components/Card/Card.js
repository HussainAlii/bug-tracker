import React from 'react'
import './Card.css'

function Card({title, desc="", users=[], action}) {
    return (
        <div class="card">
        <div class="card-model noselect" onClick={action}>
            <div class="card-header">
                <h3>{title}</h3>
                <div class="card-desc">
                    <p>{desc}</p>
                </div>
            </div>
            <div class="card-footer">
                <div class="users">
                    {users.map(user=>{
                    return <img src={user} />
                    })}
                </div>
                <p>{users.length}</p>
            </div>
        </div>
    </div>
    );
}

export default Card
