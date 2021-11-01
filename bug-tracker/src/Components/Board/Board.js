import React, {useEffect, useContext} from 'react'
import { useHistory, useParams } from 'react-router';
import { localStorageRetrieve } from '../../utilities';
import './Board.css'
import icon from '../Icons/logo.png'
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
            <div class="board">
                <div class="board-nav noselect">
                    
                </div>
                <div class="board-canvas">
                    <div class="board-content noselect">
                        
                        <div class="board-list">
                            <div class="board-list-item">
                                <img width='250px' src={icon}/>
                                <img width='250px' src={icon}/>
                                <img width='250px' src={icon}/>
                                <img width='250px' src={icon}/>
                                <img width='250px' src={icon}/>
                                <img width='250px' src={icon}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>     
    )
}

export default Board
