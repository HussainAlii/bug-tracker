import React, {useEffect} from 'react'
import './Home.css'

function Home({title}) {

    useEffect(() => {
        document.title = title;
      },[]);

    return (
        <div>
                home
        </div>
    )
}

export default Home
