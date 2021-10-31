import React, {useEffect, useContext} from 'react'
import { useHistory, useParams } from 'react-router';
import { localStorageRetrieve } from '../../utilities';
import './Board.css'

import {ProjectContext} from "../../Context/projectContext";

function Board({title}) {
    const context = useContext(ProjectContext)

    const history = useHistory()
    const {id} = useParams();
    
    useEffect( () => {
        document.title = title;
        context.isAccessAllowed(id)
    },[]);

    return (
        <div>
            Board {id}
        </div>
    )
}

export default Board
