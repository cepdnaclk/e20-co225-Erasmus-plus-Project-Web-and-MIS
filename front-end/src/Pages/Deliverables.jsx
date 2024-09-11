//TODO: Login and Edit Mode 
//TODO: Set the last modified date and User
//TODO: Automatically scroll to the specific points (interfcae, table etc)
//TODO: Sort th table -PK
//TODO: add error message when an invalid date is entered into the form 
//TODO: Edit media queries for form and table
//TODO: Didn't work for AutoFill  

import { useEffect, useState } from 'react';
import style from './Deliverables.module.css'
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { loggedInUser } from '../Pages/Login';

function Deliverables() {

  /******************** Load information whenever the page loads ********************************* */

  const [deliverables, setDeliverables] =useState([]);    
 
  useEffect(()=>{
    loadData();
  },[])

  const loadData=async()=>{
    const result=await  axios.get("http://localhost:8080/deliverable/getAll");
    setDeliverables(result.data);
  }
  
 /****************************************************************************** */

  /******************** Add a new data entry and edit the exsisting entry ********************************* */
  
  // Show interface: Either for 'Add New' or 'Edit'
  const [showInterface, setShowInterface] = useState(false);
  const [editRow, setEditRow] = useState(false);  
  const [addRow, setAddRow] = useState(false);

  const [selectedDeliverable, setSelectedDeliverable] = useState(null);
  const [deliverable, setDeliverable] = useState({  
    deliverableRelatedNo: "",
    workPackageNo: "",
    deliverableNo: "",
    deliverableName: "",
    description: "",
    leadBeneficiary: "",
    type: "",
    disseminationLevel: "",
    dueDate: ""
})

//Deconstruct the object
const {deliverableRelatedNo,workPackageNo,deliverableNo,deliverableName,description,leadBeneficiary,type,disseminationLevel,dueDate}=deliverable;
  
const onInputChange=(e)=>{
  setDeliverable({...deliverable,[e.target.name]:e.target.value})
};

//When 'Add New' button is clicked : Only For Add New
  const onAddNewClicked=()=>{
    setShowInterface(true);
    setAddRow(true);
    setEditRow(false);
    setViewRow(false); 
    setDeliverable({
      deliverableRelatedNo: "",
      workPackageNo: "",
      deliverableNo: "",
      deliverableName: "",
      description: "",
      leadBeneficiary: "",
      type: "",
      disseminationLevel: "",
      dueDate: ""
    });
  }

  //When 'Add' button is clicked in the interface : Only For Add New
  const onAddSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await axios.post("http://localhost:8080/deliverable/add", deliverable);
      // Reload the data after successful submission
      loadData();
      // Clear the form fields after successful submission if needed
      setAddRow(false);
      setShowInterface(false);
    } catch (error) {
      console.error("Error adding deliverable:", error);
    }
  };

  //When 'Edit' icon button is clicked : Only For Edit
  const onEditClick = (deliverable) => {
    setDeliverable(deliverable);
    setShowInterface(true);
    setAddRow(false);
    setEditRow(true);
    setViewRow(false); 
  }

  //When 'Update' button is clicked in the interface : Only Edit
  const onUpdateSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await axios.put(`http://localhost:8080/deliverable/update/${deliverable.deliverableRelatedNo}`, deliverable);
      // Optionally, reload the data after successful submission
      loadData();
      setEditRow(false);
      setShowInterface(false);
    } catch (error) {
      console.error("Error editing deliverable:", error);
    }
  };

  // When 'Discard' button is clicked: for Edit, and Add New
  const discardButtonClicked = () => {
    setShowInterface(false);
    setAddRow(false);    
    setEditRow(false);
  }

/******************************************************************************************/

/************************** Delete a specific entry *************************************/

const onDeleteClick = async (deliverableRelatedNo) => {
  console.log("Delete button clicked");
  console.log(deliverableRelatedNo);
  try {
    await axios.delete(`http://localhost:8080/deliverable/delete/${deliverableRelatedNo}`);
    loadData();
  } catch (error) {
    console.error("Error deleting deliverable:", error);
  }
}

/************************** View a specific entry *************************************/

const [viewRow, setViewRow] = useState(false);

const onViewClick = (deliverable) => {
  setSelectedDeliverable(deliverable);
  setViewRow(true);
  setShowInterface(false);
}

  return(
  <>
    <div className={style["deliverableTitle"]}>
          <h3>Deliverables</h3>
          <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="http://localhost:5173/"> 
                <span style={{ fontSize: 16}}>Home</span>
              </a>
            </li>
            <li className="breadcrumb-item active">
              <span style={{ fontSize: 16}}> Project Overview</span>
            </li>
            <li className="breadcrumb-item active">
              <span style={{ fontSize: 16}}> Deliverables</span>
            </li>
          </ol>
        </nav>
    </div>
    <div className={style["container"]}>
      <div className={style["tableContainer"]}>
          <table className={style["table"]}>
            <thead>
              <tr>
                <th scope="col">Work Package No</th>
                <th scope="col">Deliverable Related No</th>
                <th scope="col">Deliverable No</th>
                <th scope="col">Deliverable Name</th>
                {/* <th scope="col">Description</th> */}
                <th scope="col">Lead Beneficiary</th>
                <th scope="col">Type</th>
                <th scope="col">Dissemination Level</th>
                <th scope="col">Due Date</th>
                {loggedInUser.isLoggedIn && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
                    {deliverables.map((deliverable,index)=>(
                        <tr  key={deliverable.deliverableRelatedNo}>
                          <td>{deliverable.workPackageNo}</td>
                          <td>{deliverable.deliverableRelatedNo}</td>
                          <td>{deliverable.deliverableNo}</td>
                          <td>{deliverable.deliverableName}</td>
                          {/* <td>{deliverable.description}</td> */}
                          <td>{deliverable.leadBeneficiary}</td>
                          <td>{deliverable.type}</td>
                          <td>{deliverable.disseminationLevel}</td>
                          <td>{deliverable.dueDate}</td>
                          {loggedInUser.isLoggedIn && <td>
                            <div className={style['actionButtons']}>
                              <button className={style['actionButton']} onClick={() => onEditClick(deliverable)}><FontAwesomeIcon icon={faPen}/></button>
                              <button className={style['actionButton']} onClick={() => onViewClick(deliverable)}><FontAwesomeIcon icon={faEye}/></button>
                              <button className={style['actionButton']} onClick={() => onDeleteClick(deliverable.deliverableRelatedNo)}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>         
                          </td>}
                        </tr>
                      ))
                    }
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="9"><span>Last Modified: </span></td>
                </tr>
            </tfoot>
          </table>
      </div>
      {!addRow && loggedInUser.isLoggedIn && <div>
        <button className={style["addNewButton"]} onClick={onAddNewClicked}>Add New</button>
      </div>}
      {/* Interface- Add New/Edit */}
       <div className= {showInterface? style['Interface-Open']:style['Interface-Close']}>  
               <div className = "dataForm">
                <form onSubmit={editRow ? onUpdateSubmit : onAddSubmit}>
                     <div className = {style["formTitle"]}>
                      <h3>{editRow ? "Edit Entry" : "Add a New Entry"}</h3> 
                    </div>
                    <div className = {style["inputbox"]}>
                      <label>Work Package No</label>
                      <input type = "text" className = {style["field"]} placeholder = "Enter Work Package No" name = "workPackageNo" value={workPackageNo} onChange={(e)=>onInputChange(e)}  required/>
                     </div>
                     <div className = {style["inputbox"]}>
                       <label>Deliverable Related No</label>
                       <input type = "text" className = {style["field"]} placeholder = "Enter Deliverable Related No" name = "deliverableRelatedNo"  value={deliverableRelatedNo} onChange={(e)=>onInputChange(e)} required/>
                     </div>

                     <div className = {style["inputbox"]}>
                       <label>Deliverable No</label>
                       <input type = "text" className = {style["field"]} placeholder = " Enter Deliverable No" name = "deliverableNo" value={deliverableNo} onChange={(e)=>onInputChange(e)} required/>
                     </div>
                     <div className = {style["inputbox"]}>
                       <label>Deliverable Name</label>
                       <input type = "text" className = {style["field"]} placeholder = " Enter Deliverable Name" name = "deliverableName" value={deliverableName} onChange={(e)=>onInputChange(e)} required/>
                     </div>
                     <div className = {style["inputbox"]}>
                       <label>Description</label>
                       <input type = "text" className = {style["field"]} placeholder = " Enter Description" name = "description" value={description} onChange={(e)=>onInputChange(e)} required/>
                     </div>
                     <div className = {style["inputbox"]}>
                       <label>Lead Beneficiary</label>
                       <input type = "text" className = {style["field"]} placeholder = " Enter Lead Beneficiary" name = "leadBeneficiary"  value={leadBeneficiary} onChange={(e)=>onInputChange(e)} required/>
                     </div>
                     <div className = {style["inputbox"]}>
                       <label>Type</label>
                       <input type = "text" className = {style["field"]} placeholder = " Enter Type" name = "type"  value={type} onChange={(e)=>onInputChange(e)} required/>
                     </div>
                     <div className = {style["inputbox"]}>
                       <label>Dissemination Level</label>
                       <input type = "text" className = {style["field"]} placeholder = " Enter Dissemination Level" name = "disseminationLevel"  value={disseminationLevel} onChange={(e)=>onInputChange(e)} required/>
                     </div>
                     <div className = {style["inputbox"]}>
                       <label>Due Date</label>
                       <input type = "text" className = {style["field"]} placeholder = " Enter Due Date YYYY-MM-DD" name = "dueDate"  value={dueDate} onChange={(e)=>onInputChange(e)} required/>
                     </div>
                     <div className = {style["buttonsBlock"]}>
                        {addRow? <button type = "submit">Add</button> : <button type = "submit">Update</button> }
                        <button type="button" onClick={discardButtonClicked}>Discard</button>
                     </div>
                   </form>
                 </div>    
       </div>       
      {/* Interface- View*/}
        {selectedDeliverable && (
                    <div className={viewRow ? style['Interface-Open'] : style['Interface-Close']}>
                        <table className={style["viewDetails"]}>
                            <tbody>
                                <tr>
                                    <th>Work Package No</th>
                                    <td>{selectedDeliverable.workPackageNo}</td>
                                </tr>
                                <tr>
                                    <th>Deliverable Related No</th>
                                    <td>{selectedDeliverable.deliverableRelatedNo}</td>
                                </tr>
                                <tr>
                                    <th>Deliverable No</th>
                                    <td>{selectedDeliverable.deliverableNo}</td>
                                </tr>
                                <tr>
                                    <th>Deliverable Name</th>
                                    <td>{selectedDeliverable.deliverableName}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{selectedDeliverable.description}</td>
                                </tr>
                                <tr>
                                    <th>Lead Beneficiary</th>
                                    <td>{selectedDeliverable.leadBeneficiary}</td>
                                </tr>
                                <tr>
                                    <th>Type</th>
                                    <td>{selectedDeliverable.type}</td>
                                </tr>
                                <tr>
                                    <th>Dissemination Level</th>
                                    <td>{selectedDeliverable.disseminationLevel}</td>
                                </tr>
                                <tr>
                                    <th>Due Date</th>
                                    <td>{selectedDeliverable.dueDate}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={() => setSelectedDeliverable(null)}>Close</button>
                    </div>
                )}
             

    </div>
  </>
  );
}
  
  export default Deliverables;