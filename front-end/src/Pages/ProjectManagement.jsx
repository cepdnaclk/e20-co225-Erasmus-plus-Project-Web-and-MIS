import React, {useEffect, useState} from "react";
import axios from "axios";
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';
import {appUserRole,userID} from "../Pages/Login";
import style from "../components/ProjectManagement.module.css";
import AddTaskIcon from '@mui/icons-material/AddTask';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField,Slider, Input } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { Form } from "react-router-dom";

const ProjectManagement = () => {
  const [users,setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskListNotEmpty, setTaskListNotEmpty] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // Show interface: Either for 'Add New' or 'Edit'
  const [showInterface, setShowInterface] = useState(false);
  const [editRow, setEditRow] = useState(false);  
  const [addRow, setAddRow] = useState(false);

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

  //setting values from form
  const [progressValue,setProgressValue] = useState(0);

  const [task, setTask] = useState({  
    task_Name:"",
    start_Date:"",
    end_Date:"",
    progress:""
    // assignedUsers:""
})

const {task_Name,start_Date,end_Date,progress}=task;

 //functions to set up above values
 function changeProgressValue(event) {
    setProgressValue(Number(event.target.value))
 }
  
const onInputChange=(e)=>{
  setTask({...task,[e.target.name]:e.target.value})
};

//When 'Add New' button is clicked : Only For Add New
const onAddNewClicked=()=>{
  setShowInterface(true);
  // setAddRow(true);
  // setEditRow(false);
  // setViewRow(false); 
  setTask({
    task_Name:"",
    start_Date:"",
    end_Date:"",
    progress:"",
    assignedUsers:""
  });
}

//When 'Add' button is clicked in the interface : Only For Add New
const onAddSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission
  try {
    await axios.post("http://localhost:8080/tasks", task);
    //  reload the data after successful submission
    RefreshTasks();
    // Clear the form fields after successful submission if needed
    // setAddRow(false);
    setShowInterface(false);
  } catch (error) {
    console.error("Error adding deliverable:", error);
  }
};


//on Edit 
const onEditClick = (task) => {
  setTask(task);
  setShowInterface(true);
  // setAddRow(false);
  // setEditRow(true);
  // setViewRow(false); 
}

//When 'Update' button is clicked in the interface : Only Edit
const onUpdateSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission
  try {
    await axios.put(`http://localhost:8080/task/update/${task.task_ID}`, task);
    // Optionally, reload the data after successful submission
    RefreshTasks();
    // setEditRow(false);
    setShowInterface(false);
  } catch (error) {
    console.error("Error editing tasks:", error);
  }
};
/************************** Delete a specific entry *************************************/

const onDeleteClick = async (task_ID) => {
  // console.log("Delete button clicked");
  // console.log(deliverableRelatedNo);
  try {
    await axios.delete(`http://localhost:8080/tasks/delete/${task_ID}`);
    RefreshTasks();
  } catch (error) {
    console.error("Error deleting tasks:", error);
  }
}

 



  //to refresh on admin requirement => get ALL TASKS
  function getAllTaskInfo(){
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/tasks');
        const Users = await axios.get('http://localhost:8080/api/v1/users');
        setTasks(response.data);
        setUsers(Users.data);
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

// refresh tasks on request
  function RefreshTasks() {
    if (appUserRole=="ADMIN") {
      getAllTaskInfo();
     }else if (appUserRole=="USER"){
      getPersonalTaskInfo();
     }
  }


  function closePopUp(){
    setShowInterface(false);
  }


    return(
      <>
     {/* //TODO:? all tasks and personal tasks to different divs */}
    
     {/* all tasks */}
     <div>
     <Button onClick={RefreshTasks} variant="outlined" startIcon={<RefreshIcon />}>
          Refresh
     </Button>
     <br></br>
     { isAdmin &&
     <div>
     <Button onClick={onAddNewClicked} startIcon={<AddTaskIcon></AddTaskIcon>}>Add New Task</Button>

    {/* // a popup to add a new task */}
    <Dialog open={showInterface} onClose={closePopUp} fullWidth maxWidth="md" >
      <DialogTitle>New Task</DialogTitle>
      <DialogContent >
        <Stack spacing={1} margin={2} alignItems="center">
          {/* <Form></Form> */}
        <label>Task Name: </label>
        <input type="text" style={{width:"30%", backgroundColor:"white"}}></input>
        
        <label>Start Date: </label>
        <input type="date" style={{width:"30%"}}></input>
        
        <label>End Date: </label>
        <input type="date" style={{width:"30%"}}></input>
        
        <label>Progress</label>
        <Stack  direction="row" width="30%" spacing={2} >      
        <Slider 
           onChange={changeProgressValue}
            aria-label="Progress"
            value={typeof progressValue === 'number' ? progressValue : 0}
            min={0}
            max={100}
            />
        <input type="number" value={progressValue} onChange={changeProgressValue} defaultValue={0} style={{width:"30%", backgroundColor:"white" ,color:"black"}}>
        </input>  
      </Stack>

      <label>Team Members:</label>
      {
        users.map((user) => (
          <div>
          <label>{user.firstName+" "+user.lastName}</label>
          <input type="checkbox" value="false" ></input>
          </div>
        ))
      }
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
              
          {/* <div>
              <button className={style['actionButton']} onClick={() => onEditClick(deliverable)}><FontAwesomeIcon icon={faPen}/></button>
              <button className={style['actionButton']} onClick={() => onViewClick(deliverable)}><FontAwesomeIcon icon={faEye}/></button>
              <button className={style['actionButton']} onClick={() => onDeleteClick(deliverable.deliverableRelatedNo)}><FontAwesomeIcon icon={faTrash} /></button>
          </div> */}
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