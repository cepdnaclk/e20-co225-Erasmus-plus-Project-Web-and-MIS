//Completed: load all, delete by id
//TODO: update, add new row, add new columns

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
      const result=await axios.get("http://localhost:8080/workplan/getAll");
      setWorkplanActivities(result.data);
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

    <h1> Workplan</h1>
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
              </tr>
            </thead>
            <tbody>
                    {workplanActivities.map((workplanActivity,index)=>(
                        <tr  key={workplanActivity.activityNo}>
                          <td>{workplanActivity.activityNo}</td>
                          <td>{workplanActivity.activityName}</td>
                          <td style={{ backgroundColor: workplanActivity.y1_q1 ? 'white' : '#72a1e685' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y1_q2 ? 'white' : '#72a1e685' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y1_q3 ? 'white' : '#72a1e685' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y1_q4 ? 'white' : '#72a1e685' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y2_q1 ? 'white' : '#72a1e685' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y2_q2 ? 'white' : '#72a1e685' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y2_q3 ? 'white' : '#72a1e685' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y2_q4 ? 'white' : '#72a1e685' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y3_q1 ? 'white' : '#72a1e685' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y3_q2 ? 'white' : '#72a1e685' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y3_q3 ? 'white' : '#72a1e685' }}></td>
                          <td style={{ backgroundColor: workplanActivity.y3_q4 ? 'white' : '#72a1e685' }}></td>
        
                          {loggedInUser.isLoggedIn && <td>
                            <div className={style['actionButtons']}>
                              <button className={style['actionButton']} onClick={() => onEditClick(deliverable)}><FontAwesomeIcon icon={faPen}/></button>
                              <button className={style['actionButton']} onClick={() => onDeleteClick(workplanActivity.activityNo)}><FontAwesomeIcon icon={faTrash} /></button>
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

      </div>
      </>
  );
}
  
export default Workplan;

