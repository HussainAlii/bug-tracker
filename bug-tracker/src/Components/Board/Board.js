import React, {useEffect} from 'react'
import { useHistory, useParams } from 'react-router';
import { localStorageRetrieve } from '../../utilities';
import './Board.css'

function Board({title}) {
    const history = useHistory()
    const {id} = useParams();
    
    useEffect( () => {
        document.title = title;
        !localStorageRetrieve("project") || localStorageRetrieve("project") != id &&history.push("/")
      },[]);

    return (
        <div>
            Board
        </div>
    )
}

export default Board
