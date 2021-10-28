import React, {useEffect} from 'react'
import { useHistory, useParams } from 'react-router';
import { localStorageRetrieve } from '../../utilities';

function Home({title}) {
    const history = useHistory()
    const {id} = useParams();
    
    useEffect( () => {
        document.title = title;

      },[]);

    return (
        <div>
            Home
        </div>
    )
}

export default Home
