import React, {useEffect} from 'react'
import './Dashboard.css'
import openProjectIcon from '../Icons/open_project.svg'
import archivedProjectIcon from '../Icons/stack.svg'
import taskAssignedIcon from '../Icons/assignment.svg'
import tasksDoneIcon from '../Icons/assignment_turned_in.svg'
import pinnedIcon from '../Icons/pinned.svg'
import unpinnedIcon from '../Icons/unpinned.svg'
import {Bar, Doughnut, Line, Pie} from 'react-chartjs-2'
import { Grid } from '@material-ui/core'

function Dashboard({title}) {

    useEffect(() => {
        document.title = title;
      },[]);

      const data_doughnut = {
        labels: [
          ],
        datasets: [{
          data: [1],
          backgroundColor: [

          ],
          hoverOffset: 9
        }]
      };
      
    const data_pie = {
        labels: [
          'greenish',
          'very old lists',
          'gold',
        ],
        datasets: [{
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 9
        }]
      };

      const MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',

      ];

      const data_bar ={
        labels: MONTHS,
        datasets: [{
          axis: 'y',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      };

      const data_line ={
        labels: MONTHS,
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };


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
                        <SmallCard title="Tasks Done " value={'0'} icon={tasksDoneIcon}/>
                    </Grid>
                </Grid>
            </div>

            <Box data_line={data_line} data_doughnut={data_doughnut} data_pie={data_pie} data_bar={data_bar} />

        </div>
    )
}

export default Dashboard

export function SmallCard({icon, title, value}){
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

export function Box({data_doughnut, data_pie, data_bar, data_line}){

    return (
    <div class="box">
        <div class="box-header">
            <p>test</p>
            <img class="" src={unpinnedIcon} />
        </div>
        <div class="box-body">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}  md={3} >
                    <SmallCard title="Closed Tasks" value={'0'} icon={tasksDoneIcon}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                    <SmallCard title="Opened Tasks" value={'0'} icon={taskAssignedIcon}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                    <SmallCard title="Tasks you accomplished" value={'0'} icon={tasksDoneIcon}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                    <SmallCard title="Assigned To me" value={'0'} icon={taskAssignedIcon}/>
                </Grid>

                <Grid item xs={12} sm={6} >
                    {data_doughnut && <Doughnut 
                        data={data_doughnut} 
                        width={500}
                        height={350}
                        options={{ 
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Available Tasks / TAG '
                                }
                            } 
                        }}
                    />}
                </Grid>
                <Grid item xs={12} sm={6} >
                    {data_pie && <Pie 
                        data={data_pie}
                        width={500}
                        height={350}
                        options={{ 
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Available Tasks / List ',
                                    
                                }
                            } 
                        }}
                    />}
                </Grid>

                <Grid item xs={12} sm={6}>
                    {data_bar && <Bar 
                        data={data_bar}
                        style={{minHeight:'210px'}} //35 *
                        options={{ 
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Total Work Done / User'
                                },
                                legend: {
                                    display: false
                                },
                            },
                            indexAxis: 'y'
                        }}
                    />}
                </Grid>

                <Grid item xs={12} sm={6}>
                    {data_line && <Line 
                        data={data_line}
                        options={{ 
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Performance Over Time'
                                },
                                legend: {
                                    display: false
                                },
                            },
                        }}
                    />}
                </Grid>
            </Grid>

        </div>
    </div>
    );
}