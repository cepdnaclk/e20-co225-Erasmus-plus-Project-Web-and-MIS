import React, {useEffect, useState} from "react";
import axios from "axios";
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';
import {appUserRole,userID} from "../Pages/Login";
import style from "../components/ProjectManagement.module.css";
import AddTaskIcon from '@mui/icons-material/AddTask';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { Form } from "react-router-dom";

const ProjectManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [taskListNotEmpty, setTaskListNotEmpty] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [popupOpen,setPopupOpen] = useState(false);
  //to load for the first time on page visit
  useEffect(() => {
    if (appUserRole=="ADMIN") {
      setIsAdmin(true);
      getAllTaskInfo();     
    }else if(appUserRole=="USER"){
      setIsAdmin(false);
      getPersonalTaskInfo();
    }
  }, []);

  //to refresh on admin requirement => get ALL TASKS
  function getAllTaskInfo(){
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/tasks');
        setTasks(response.data);
        if (response.data.length!=0) {
          setTaskListNotEmpty(true);
        }
        console.log("data.... ",response.data)
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }

  //to refresh on user requirement => get PERSONAL TASKS
  function getPersonalTaskInfo(){
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/tasks/users/${userID}`);
        setTasks(response.data);
        if (response.data.length!=0) {
          setTaskListNotEmpty(true);
        }
        console.log("data.... ",response.data)
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }


  function RefreshTasks() {
    if (appUserRole=="ADMIN") {
      getAllTaskInfo();
     }else if (appUserRole=="USER"){
      getPersonalTaskInfo();
     }
  }

  function addNewTask() {
    setPopupOpen(true)
  }

  function closePopUp(){
    setPopupOpen(false);
  }


    return(
      <>
     {/* //TODO:? all tasks and personal tasks to different divs */}
    
     {/* all tasks */}
     {/* <div class={isAdmin ? style["showDiv"]:style["hideDiv"]}> */}
     <div>
     <Button onClick={RefreshTasks} variant="outlined" startIcon={<RefreshIcon />}>
          Refresh
     </Button>
     <br></br>
     { isAdmin &&
     <div>
     <Button onClick={addNewTask} startIcon={<AddTaskIcon></AddTaskIcon>}>Add New Task</Button>

    {/* // a popup to add a new task */}
    <Dialog open={popupOpen} onClose={closePopUp} fullWidth maxWidth="md" >
      <DialogTitle>New Task</DialogTitle>
      <DialogContent>
        <Stack spacing={1} margin={2}>
          {/* <Form></Form> */}
        <TextField>TaskName</TextField>
        <label>Task Name: </label>
        <input type="text" style={{width:"30%"}}></input>
        <label>Start Date: </label>
        <input type="date" style={{width:"30%"}}></input>
        <label>End Date: </label>
        <input type="date" style={{width:"30%"}}></input>
        </Stack>
      </DialogContent>
      <DialogActions>
         <Button onClick={closePopUp} endIcon={<CloseIcon></CloseIcon>}>Close</Button>
      </DialogActions>
    </Dialog>
    </div>
     }
     { taskListNotEmpty &&
          tasks.map((item) => (
            <div key={item.task_ID} className={style["taskCards"]}>
              <h2>{item.task_Name}</h2>
              <p>{item.newsDescription}</p>
              <b><p>Start Date: {item.start_Date}</p></b>
              <b><p>End Date: {item.end_Date}</p></b>
              <b><p>Progress: {item.progress}</p></b>
              {/* task members */}
              <div style={{textAlign:"center"}}>
             <ol style={{listStylePosition: "inside"}}>
               {item.assignedUsers.map((assignedUser) => (
                <li key={assignedUser.id}><span>{assignedUser.firstName+" "+assignedUser.lastName}</span></li>
              ))}
              </ol>
              </div>
              {/* link storing financial report location */}
              <div><a href="https://www.facebook.com/UniversityOfPeradeniya" target="_blank" rel="noopener noreferrer">Financial Report</a> </div>
              </div>
          ))
        }
        {
          !taskListNotEmpty && 
            <h4> No Tasks to View!</h4>
        }
      
     </div>
      {/* //personal tasks */}
      {/* <div class={isAdmin ? style["hideDiv"]:style["showDiv"]}>
      <Button onClick={getPersonalTaskInfo} variant="outlined" startIcon={<RefreshIcon />}>
          Refresh
     </Button>
      {
          tasks.map((item) => (
            <div key={item.task_ID} className="tasks-card">
              <h2>{item.task_Name}</h2>
              <p>{item.newsDescription}</p>
              <b><p>Start Date: {item.start_Date}</p></b>
              <b><p>End Date: {item.end_Date}</p></b>
              <b><p>Progress: {item.progress}</p></b>
              <a href="" target="_blank" rel="noopener noreferrer">Financial Report</a>
            </div>
          ))
        }
        {
          !taskListNotEmpty && 
            <h1> No tasks assigned yet</h1>
        }

     
   </div> */}
      </>
    );
  // }
 
}
  export default ProjectManagement;