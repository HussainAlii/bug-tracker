import React, {useEffect} from 'react'
import { useHistory, useParams } from 'react-router';
import { localStorageRetrieve } from '../../utilities';

function Home({title}) {
    const history = useHistory()
    const {id} = useParams();
    
    useEffect( () => {
        document.title = title;
        !localStorageRetrieve("project") || localStorageRetrieve("project") != id &&history.push("/")

      },[]);

    return (
        <div>
            Share
        </div>
    )
}

export default Home
