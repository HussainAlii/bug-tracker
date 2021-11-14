import React, {useEffect} from 'react'
import './Dashboard.css'
import openProjectIcon from '../Icons/open_project.svg'
import archivedProjectIcon from '../Icons/stack.svg'
import taskAssignedIcon from '../Icons/assignment.svg'
import tasksDoneIcon from '../Icons/assignment_turned_in.svg'
import pinnedIcon from '../Icons/pinned.svg'
import unpinnedIcon from '../Icons/unpinned.svg'
import { Grid } from '@material-ui/core'

function Dashboard({title}) {

    useEffect(() => {
        document.title = title;
      },[]);

    return (
        <div class="dashboard" >
            <div style={{marginBottom:'30px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3} >
                        <SmallCard title="Opened projects" value={'0'} icon={openProjectIcon}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} >
                        <SmallCard title="Archived projects" value={'0'} icon={archivedProjectIcon}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} >
                        <SmallCard title="Assigned To Me " value={'0'} icon={taskAssignedIcon}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} >
                        <SmallCard title="Tickets Done " value={'0'} icon={tasksDoneIcon}/>
                    </Grid>
                </Grid>
            </div>
            <Box />

        </div>
    )
}

export default Dashboard

export function SmallCard({icon, title, value, box}){
    return (
    <div class="small-card noselect get-bigger">
        <div class="small-card-title">
            <b style={{textAlign: 'center'}}>{value}</b>
            <p style={{margin:'0', marginTop:'5px'}}>{title}</p>
        </div>
        <img class="small-card-img" src={icon} />
    </div>
    );
}

export function Box({}){

    return (
    <div class="box">
        <div class="box-header">
            <p>test</p>
            <img class="" src={unpinnedIcon} />
        </div>
        <div class="box-body">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}  md={3} >
                    <SmallCard box title="Closed Tickets" value={'0'} icon={tasksDoneIcon}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                    <SmallCard box title="Opened Tickets" value={'0'} icon={taskAssignedIcon}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                    <SmallCard box title="Tickets you accomplished" value={'0'} icon={tasksDoneIcon}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                    <SmallCard box title="Assigned To me" value={'0'} icon={taskAssignedIcon}/>
                </Grid>
            </Grid>

            

        </div>
    </div>
    );
}