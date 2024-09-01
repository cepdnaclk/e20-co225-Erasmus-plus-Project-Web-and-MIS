import React, {useEffect, useState} from "react";
import axios from "axios";
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';
import {appUserRole,userID} from "../Pages/Login";
import style from "../components/ProjectManagement.module.css";
import AddTaskIcon from '@mui/icons-material/AddTask';
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogActions, DialogContent, Stack,Slider } from "@mui/material";


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
})

const {task_Name,start_Date,end_Date,progress}=task;

 //functions to set up above values
 function changeProgressValue(event) {
    setProgressValue(Number(event.target.value))
    setTask({...task,["progress"]:event.target.value})
 }
  
const onInputChange=(e)=>{
  setTask({...task,[e.target.name]:e.target.value})
};

//When 'Add New' button is clicked : Only For Add New
const onAddNewClicked=()=>{
  setShowInterface(true);
  setAddRow(true);
  setEditRow(false);
  // setViewRow(false); 
  setTask({
    task_Name:"",
    start_Date:"",
    end_Date:"",
    progress:"",
  });
}

//When 'Add' button is clicked in the interface : Only For Add New
const onAddSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission
  try {
    await axios.post("http://localhost:8080/api/v1/tasks", task);
    alert("task added");
    //  reload the data after successful submission
    RefreshTasks();
    // Clear the form fields after successful submission if needed
    setAddRow(false);
    setShowInterface(false);
  } catch (error) {
    console.error("Error adding deliverable:", error);
  }
};


//on Edit 
const onEditClick = (task) => {
  setTask(task);
  setProgressValue(task.progress);
  setShowInterface(true);
  setAddRow(false);
  setEditRow(true);
}

//When 'Update' button is clicked in the interface : Only Edit
const onUpdateSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission
  try {
    const { ["assignedUsers"]:tmp, ...newFormatTask } = task;
    setTask(newFormatTask);
    console.log(rest," submiting")
    await axios.put(`http://localhost:8080/api/v1/tasks/update`, newFormatTask);
    // Optionally, reload the data after successful submission
    RefreshTasks();
    setEditRow(false);
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

    await axios.delete(`http://localhost:8080/api/v1/tasks/${task_ID}`);
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
     <div className={style["ProjectManagementTitle"]}>
          <h3>Project Management</h3>
    </div>
     <Button onClick={RefreshTasks} variant="outlined" startIcon={<RefreshIcon />}>
          Refresh
     </Button>
     <br></br>
     { isAdmin &&
     <div>
     <Button onClick={onAddNewClicked} startIcon={<AddTaskIcon></AddTaskIcon>}>Add New Task</Button>

    {/* // a popup to add a new task */}
    <Dialog open={showInterface} onClose={closePopUp} fullWidth maxWidth="md" >
      <DialogContent >
        {/* <Stack spacing={1} margin={2} alignItems="center"> */}
          {/* <Form></Form> */}
        <div className = "dataForm"> 
        <form onSubmit={editRow ? onUpdateSubmit : onAddSubmit}>  
          <div className = {style["formTitle"]}>
              <h3>{editRow ? "Edit Entry" : "Add a New Entry"}</h3> 
          </div>
          <div className = {style["inputbox"]}>  
            <label>Task Name: </label>
            <input type="text" name="task_Name" value={task_Name}className = {style["field"]} onChange={(e)=>onInputChange(e)}></input>
          </div>
          <div className = {style["inputbox"]}>  
            <label>Start Date: </label>
            <input type="date" name="start_Date"value={start_Date}className = {style["field"]} onChange={(e)=>onInputChange(e)} ></input>
          </div>
          <div className = {style["inputbox"]}>  
            <label>End Date: </label>
            <input type="date" name="end_Date"  value={end_Date}className = {style["field"]} onChange={(e)=>onInputChange(e)}></input>
          </div>
          <div className = {style["inputbox"]}>  
          <label>Progress</label>
            {/* <Stack  direction="row" width="30%" spacing={2} >       */}
            <div style={{width:"30%"}}>
            <Slider 
              onChange={changeProgressValue}
                aria-label="Progress"
                value={typeof progressValue === 'number' ? progressValue : 0}
                min={0}
                max={100}
                width="30%"
                />
            </div>
            <input type="number" name="progress"value={progressValue} onChange={changeProgressValue} defaultValue={0} className = {style["integerField"]}>
            </input>  
          {/* </Stack> */}
        </div>
        <div className = {style["inputbox"]}>  
            <label>Team Members:</label>
            <div class={style["checkBoxContainer"]}>
            {
              users.map((user) => (
                <div>
                <input type="checkbox" value={user.id} ></input>
                <label>{user.firstName+" "+user.lastName}</label>
                </div>
              ))
            }
          </div>
        </div>
        {addRow? <button type = "submit">Add</button> : <button type = "submit">Update</button> }
        </form>
      </div>
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
              
          {isAdmin &&
            <div>
              <button className={style['actionButton']} onClick={() => onEditClick(item)}><FontAwesomeIcon icon={faPen}/></button>
              <button className={style['actionButton']} onClick={() => onDeleteClick(item.task_ID)}><FontAwesomeIcon icon={faTrash} /></button>
          </div>}
              </div>
              
          ))
        }
        {
          !taskListNotEmpty && 
            <h4> No Tasks to View!</h4>
        }
      
     </div>
      </>
    );
  // }
 
}
  export default ProjectManagement;