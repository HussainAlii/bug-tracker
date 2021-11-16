import React, {useEffect, useState} from 'react'
import './Dashboard.css'
import openProjectIcon from '../Icons/open_project.svg'
import archivedProjectIcon from '../Icons/stack.svg'
import taskAssignedIcon from '../Icons/assignment.svg'
import tasksDoneIcon from '../Icons/assignment_turned_in.svg'
import pinnedIcon from '../Icons/pinned.svg'
import unpinnedIcon from '../Icons/unpinned.svg'
import {Bar, Doughnut, Line, Pie} from 'react-chartjs-2'
import { Grid } from '@material-ui/core'
import { getDashboardData, pinProject } from '../../requests'
import { getRandomInt } from '../../utilities'

function Dashboard({title}) {

    const [summeryInfo, setSummeryInfo] = useState({opened: 0, archived:0, assigned:0, done:0})
    const [projects, setProjects] = useState([])
    

    useEffect( () => {
        document.title = title;
      },[]);

      useEffect(() => {
         getDashboardData().then(res=>{
            setProjects(res['projects'] || [])
            setSummeryInfo(res['summeryInfo'] || {})
        });
      },[]);


      function handlePinProject(index, project_id){
        const projects_copy = [...projects]
        const project_copy = {...projects_copy[index]}
        let new_pinned = !project_copy.project_info.is_pinned 
        project_copy.project_info.is_pinned = new_pinned
        projects_copy.splice(index, 1)

        if(new_pinned) projects_copy.unshift(project_copy)
        else projects_copy.push(project_copy)
        
        setProjects(projects_copy)

        pinProject(project_id, new_pinned)
        
      }

    return (
        <div class="dashboard" >
            <div style={{marginBottom:'30px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3} >
                        <SmallCard title="Opened projects" value={summeryInfo.opened} icon={openProjectIcon}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} >
                        <SmallCard title="Archived projects" value={summeryInfo.archived} icon={archivedProjectIcon}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} >
                        <SmallCard title="Assigned To Me " value={summeryInfo.assigned} icon={taskAssignedIcon}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} >
                        <SmallCard title="Tasks Done " value={summeryInfo.done} icon={tasksDoneIcon}/>
                    </Grid>
                </Grid>
            </div>

            {projects.length > 0? projects.map((project, index) =>{

                //work_per_user_obj--------------
                const work_per_user_obj ={
                    labels: [],
                    datasets: [{
                      axis: 'y',
                      data: [],
                      fill: false,
                      backgroundColor: [], //'rgba(255, 99, 132, 0.2)'
                      borderColor: [], //'rgb(255, 99, 132)',
                      borderWidth: 1
                    }]
                  };

                for (const email in project.work_per_user_obj) {
                    work_per_user_obj.labels.push(project.work_per_user_obj[email].name)
                    work_per_user_obj.datasets[0].data.push(project.work_per_user_obj[email].val)
                    let r = getRandomInt(254), g = getRandomInt(254), b = getRandomInt(254)
                    work_per_user_obj.datasets[0].backgroundColor.push(`rgba(${r},${g},${b}, 0.2)`)
                    work_per_user_obj.datasets[0].borderColor.push(`rgb(${r},${g},${b})`)

                }
                // work_per_user_obj.datasets[0].data.push(work_per_user_obj.datasets[0].data.at(0) + 1)                
                
                //tasks_per_list------------------

                const tasks_per_list = {
                    labels: [],
                    datasets: [{
                      data: [],
                      backgroundColor: [],
                      hoverOffset: 9
                    }]
                  };

                  for (const t_list in project.tasks_per_list) {
                    tasks_per_list.labels.push(project.tasks_per_list[t_list].title)
                    tasks_per_list.datasets[0].data.push(project.tasks_per_list[t_list].val)
                    tasks_per_list.datasets[0].backgroundColor.push(project.tasks_per_list[t_list].backgroundColor)
                }

                //tags_per_list------------------

                const tags_per_list = {
                    labels: [],
                    datasets: [{
                      data: [],
                      backgroundColor: [],
                      hoverOffset: 9
                    }]
                  };


                  for (const t_tag in project.tags_per_list) {
                    tags_per_list.labels.push(project.tags_per_list[t_tag].title)
                    tags_per_list.datasets[0].data.push(project.tags_per_list[t_tag].val)
                    tags_per_list.datasets[0].backgroundColor.push(project.tags_per_list[t_tag].backgroundColor)
                }

                //performance_over_time_obj -----------------
                let performance_over_time_obj = {
                    labels: project.performance_over_time_obj.label || [],
                    datasets: [{
                      data: project.performance_over_time_obj.data || [],
                      fill: false,
                      borderColor: '#A781D2',
                      tension: 0.1
                    }]
                  };
                return (
                <Box project_index={index} handlePinProject={handlePinProject} data_line={performance_over_time_obj} data_doughnut={tags_per_list} data_pie={tasks_per_list} data_bar={work_per_user_obj} project_info={project.project_info} />
                )
            }) : 
            
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', color:'gray'}}>
                            You don't Have Any Available Project!
                        </div>
            }


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

export function Box({data_doughnut, data_pie, data_bar, data_line, project_info, handlePinProject, project_index}){

    return (
    <div class="box">
        <div class="box-header">
            <p>{project_info.title}</p>
            <img onClick={()=>handlePinProject(project_index, project_info.id)} src={project_info.is_pinned? pinnedIcon : unpinnedIcon} />
        </div>
        <div class="box-body">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3} >
                    <SmallCard title="Opened Tasks" value={project_info.opened || 0} icon={taskAssignedIcon}/>
                </Grid>
                <Grid item xs={12} sm={6}  md={3} >
                    <SmallCard title="Closed Tasks" value={project_info.closed || 0} icon={tasksDoneIcon}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                    <SmallCard title="Assigned To me" value={project_info.assigned || 0} icon={taskAssignedIcon}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                    <SmallCard title="Tasks you accomplished" value={project_info.done || 0} icon={tasksDoneIcon}/>
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