//TODO: CSS for checkbox and table
//Media queries
//Pop as a window kinda thing , not an interface 
//Use a seperate id as PK in back end
//Validate form inputs
//Scroll into view 
//Auto focus the for input
//Sort the table
//TODO: Set the last modified date and User

import { useEffect , useState} from 'react';
import style from './Workplan.module.css'
import axios from 'axios';
import { loggedInUser } from '../Pages/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';


function Workplan() {

  /******************** Load information whenever the page loads ********************************* */

  const[workplanActivities, setWorkplanActivities]=useState([])

  useEffect (()=>{
    loadData();
  },[]);

  const loadData=async()=>{
      try {
        const result = await axios.get("http://localhost:8080/workplan/getAll");
        setWorkplanActivities(result.data);
      } catch (error) {
        console.error("Error loading workplan activities:", error);
      }
  }

  /******************** Add a new data entry and edit the exsisting entry ********************************* */
    
    // Show the interface: Either for 'Add New' or 'Edit'
    const [showInterface, setShowInterface] = useState(false);
    const [editRow, setEditRow] = useState(false);  
    const [addRow, setAddRow] = useState(false);

    //State Variable - to save the original PK before updating the entry
    const [originalActivityNo, setOriginalActivityNo] = useState(null);

    //Initialize the object
    const [activity, setActivity] = useState({
      activityNo:"",
      activityName:"",
      y1_q1: false,
      y1_q2: false,
      y1_q3: false,
      y1_q4: false,
      y2_q1: false,
      y2_q2: false,
      y2_q3: false,
      y2_q4: false,
      y3_q1: false,
      y3_q2: false,
      y3_q3: false,
      y3_q4: false,
      y4_q1: false,
      y4_q2: false,
      y4_q3: false,
      y4_q4: false
    })

    //Deconstruct the object and assign them to 'values' in the form 
    const{activityNo,activityName,y1_q1, y1_q2, y1_q3, y1_q4, y2_q1, y2_q2, y2_q3, y2_q4, y3_q1, y3_q2, y3_q3, y3_q4, y4_q1, y4_q2, y4_q3, y4_q4} = activity;

    //Function saves the information taken from the form 
    //Event 'e' is passed to the function 
    const onInputChange = (e) => {
      console.log(e.target.value)
      //Deconstruct from event target
      const { name, value, type, checked } = e.target;
      setActivity({
        ...activity,
        [name]: type === "checkbox" ? checked : value,
      });
    };
    
    //When 'Add New' button is clicked : Only For Add New
    const onAddNewClicked=()=>{
      setShowInterface(true);
      setAddRow(true);
      setEditRow(false);
      setActivity({
        activityNo: "",
        activityName: "",
        y1_q1: false,
        y1_q2: false,
        y1_q3: false,
        y1_q4: false,
        y2_q1: false,
        y2_q2: false,
        y2_q3: false,
        y2_q4: false,
        y3_q1: false,
        y3_q2: false,
        y3_q3: false,
        y3_q4: false,
        y4_q1: false,
        y4_q2: false,
        y4_q3: false,
        y4_q4: false
      });
    }

    //When 'Add' button is clicked in the interface : Only For Add New
    const onAddSubmit = async (e) => {
      e.preventDefault(); // Prevent default form submission
      try {
        await axios.post("http://localhost:8080/workplan/add", activity);
        // Reload the data after successful submission
        loadData();       
        // Clear the form fields after successful submission if needed
        setShowInterface(false);
        setAddRow(false);
        alert("Activity added successfully!");
      } catch (error) {
        console.error("Error adding workplan activity:", error);
        alert("Failed to add activity!");
      }
    }

    //When 'Edit' icon button is clicked : Only For Edit
    const onEditClick = (activity) => {
      setOriginalActivityNo(activity.activityNo); // Preserve the original primary key
      setActivity(activity);  //Set the activity for editing 
      setShowInterface(true);
      setAddRow(false);
      setEditRow(true);
      setViewRow(false); 
    }

    //When 'Update' button is clicked in the interface : Only Edit
    const onUpdateSubmit = async (e) => {
      e.preventDefault(); // Prevent default form submission
      try {
        await axios.put(`http://localhost:8080/workplan/update/${originalActivityNo}`, activity);
        // Optionally, reload the data after successful submission
        loadData();
        setEditRow(false);
        setShowInterface(false);
        alert("Activity updated successfully!");
      } catch (error) {
        console.error("Error editing workplan activity:", error);
        alert("Failed to update activity!");
      }
    }

    // When 'Discard' button is clicked: for Edit, and Add New
    const discardButtonClicked = () => {
      setShowInterface(false);
      setAddRow(false);    
      setEditRow(false);
    }

  /************************** Delete a specific entry *************************************/

  const onDeleteClick = async (activityNo) => {
    console.log("Delete button clicked");
    console.log(activityNo);
    try {
      await axios.delete(`http://localhost:8080/workplan/delete/${activityNo}`);
      loadData();
    } catch (error) {
      console.error("Error deleting workplan activity:", error);
    }
  }

  return(
    <>
      <div className={style["workplanTitle"]}>
          <h3>Workplan</h3>
      </div>
      
    <div className={style["container"]}>
      <div className={style["tableContainer"]}>
          <table className={style["table"]}>
            <thead>
              <tr>
                <th scope="col" rowspan={2}>Activity No</th>
                <th scope="col"rowspan={2}>Activity Name</th>
                <th scope="col" colSpan={4}>Year 1</th>
                <th scope="col" colSpan={4}>Year 2</th>
                <th scope="col" colSpan={4}>Year 3</th>
                <th scope="col" colSpan={4}>Year 4</th>
                {loggedInUser.isLoggedIn && <th rowspan={2}>Action</th>}
              </tr>
              <tr>
                <th>Q1</th>
                <th>Q2</th>
                <th>Q3</th>
                <th>Q4</th>
                <th>Q1</th>
                <th>Q2</th>
                <th>Q3</th>
                <th>Q4</th>
                <th>Q1</th>
                <th>Q2</th>
                <th>Q3</th>
                <th>Q4</th>
                <th>Q1</th>
                <th>Q2</th>
                <th>Q3</th>
                <th>Q4</th>
              </tr>
            </thead>
            <tbody>
                    {workplanActivities.map((workplanActivity,index)=>(
                        <tr  key={workplanActivity.activityNo}>
                          <td>{workplanActivity.activityNo}</td>
                          <td>{workplanActivity.activityName}</td>
                          <td style={{ backgroundColor: workplanActivity.y1_q1 ? '#72a1e685' : 'white' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y1_q2 ? '#72a1e685' : 'white' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y1_q3 ? '#72a1e685' : 'white' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y1_q4 ? '#72a1e685' : 'white' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y2_q1 ? '#72a1e685' : 'white' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y2_q2 ? '#72a1e685' : 'white' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y2_q3 ? '#72a1e685' : 'white' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y2_q4 ? '#72a1e685' : 'white' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y3_q1 ? '#72a1e685' : 'white' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y3_q2 ? '#72a1e685' : 'white' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y3_q3 ? '#72a1e685' : 'white' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y3_q4 ? '#72a1e685' : 'white' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y4_q1 ? '#72a1e685' : 'white' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y4_q2 ? '#72a1e685' : 'white' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y4_q3 ? '#72a1e685' : 'white' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y4_q4 ? '#72a1e685' : 'white' }}></td>
        
                          {loggedInUser.isLoggedIn && <td>
                            <div className={style['actionButtons']}>
                              <button className={style['actionButton']} onClick={() => onEditClick(workplanActivity)}><FontAwesomeIcon icon={faPen}/></button>
                              <button className={style['actionButton']} onClick={() => onDeleteClick(workplanActivity.activityNo)}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>         
                          </td>}
                        </tr>
                      ))
                    }
            </tbody>
            {/* <tfoot>
                <tr>
                    <td colSpan="12"><span>Last Modified: </span></td>
                </tr>
            </tfoot> */}
          </table>
      </div>
      {!addRow && loggedInUser.isLoggedIn && <div>
        <button className={style["addNewButton"]} onClick={onAddNewClicked}>Add New</button>
      </div>}
      {/* Interface- Add New Row/Edit Row */}
       <div className= {showInterface? style['Interface-Open']:style['Interface-Close']}>  
               <div className = "dataForm">
                <form onSubmit={editRow ? (e)=>onUpdateSubmit(e) : (e)=>onAddSubmit(e)}>
                     <div className = {style["formTitle"]}>
                      <h3>{editRow ? "Edit Activity" : "Add a New Activity"}</h3> 
                    </div>
                    <div className = {style["inputbox"]}>
                      <label>Activity No</label>
                      <input 
                        type = "text" 
                        className = {style["field"]} 
                        placeholder = "Enter Activity No" 
                        name = "activityNo"
                        value={activityNo} 
                        onChange={(e)=>onInputChange(e)} 
                        required/>
                     </div>
                     <div className = {style["inputbox"]}>
                       <label>Activity Name</label>
                       <input 
                        type = "text" 
                        className = {style["field"]} 
                        placeholder = "Enter Activity Name" 
                        name = "activityName"
                        value={activityName} 
                        onChange={(e)=>onInputChange(e)} 
                        required/>
                     </div>
                    
                     <table className={style["table"]}>
                      <thead>
                        <tr>
                          <th scope="col" colSpan={4}>Year 1</th>
                          <th scope="col" colSpan={4}>Year 2</th>
                          <th scope="col" colSpan={4}>Year 3</th>
                          <th scope="col" colSpan={4}>Year 4</th>
                        </tr>
                        <tr>
                          <th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th>
                          <th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th>
                          <th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th>
                          <th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><input type="checkbox" name="y1_q1" checked={y1_q1} onChange={onInputChange} /></td>
                          <td><input type="checkbox" name="y1_q2" checked={y1_q2} onChange={onInputChange} /></td>
                          <td><input type="checkbox" name="y1_q3" checked={y1_q3} onChange={onInputChange} /></td>
                          <td><input type="checkbox" name="y1_q4" checked={y1_q4} onChange={onInputChange} /></td>

                          <td><input type="checkbox" name="y2_q1" checked={y2_q1} onChange={onInputChange} /></td>
                          <td><input type="checkbox" name="y2_q2" checked={y2_q2} onChange={onInputChange} /></td>
                          <td><input type="checkbox" name="y2_q3" checked={y2_q3} onChange={onInputChange} /></td>
                          <td><input type="checkbox" name="y2_q4" checked={y2_q4} onChange={onInputChange} /></td>
                          
                          <td><input type="checkbox" name="y3_q1" checked={y3_q1} onChange={onInputChange} /></td>
                          <td><input type="checkbox" name="y3_q2" checked={y3_q2} onChange={onInputChange} /></td>
                          <td><input type="checkbox" name="y3_q3" checked={y3_q3} onChange={onInputChange} /></td>
                          <td><input type="checkbox" name="y3_q4" checked={y3_q4} onChange={onInputChange} /></td>

                          <td><input type="checkbox" name="y4_q1" checked={y4_q1} onChange={onInputChange} /></td>
                          <td><input type="checkbox" name="y4_q2" checked={y4_q2} onChange={onInputChange} /></td>
                          <td><input type="checkbox" name="y4_q3" checked={y4_q3} onChange={onInputChange} /></td>
                          <td><input type="checkbox" name="y4_q4" checked={y4_q4} onChange={onInputChange} /></td>
                        </tr>                                   
                      </tbody>
                      </table>
                     <div className = {style["buttonsBlock"]}>
                        {addRow? <button type = "submit">Add</button> : <button type = "submit">Update</button> }
                        <button type="button" onClick={discardButtonClicked}>Discard</button>
                     </div>
                   </form>
                 </div>    
       </div>

      </div>
      </>
  );
}
  
export default Workplan;

