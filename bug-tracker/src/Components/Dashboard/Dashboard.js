import React, {useEffect} from 'react'
import './Dashboard.css'
import coming_soon from '../Icons/coming_soon.png'
function Dashboard({title}) {

    useEffect(() => {
        document.title = title;
      },[]);

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'flex-start'}}>
                <img src={coming_soon}/>
        </div>
    )
}

export default Dashboard
