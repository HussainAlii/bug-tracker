import React, {useEffect} from 'react'
import './Dashboard.css'

function Dashboard({title}) {

    useEffect(() => {
        document.title = title;
      },[]);

    return (
        <div>
                Dashboard
        </div>
    )
}

export default Dashboard
