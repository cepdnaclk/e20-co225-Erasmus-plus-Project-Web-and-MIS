import style from "../components/Dashboard.module.css";
function Dashboard() {



    return(
      <>
      <div className={style["DashboardTitle"]}>
          <h3>Dashboard</h3>

          {/* <div className="tasks-container">
        {tasks.map((item) => (
          <div key={item.taskID} className="task-tile">
            <h2>{item.taskName}</h2> 
            <b><p>Date: {item.startDate}</p></b> 
            <b><p>Date: {item.endDtae}</p></b> 
            <b><p>Author: {item.newsAuthor}</p></b> 
            <a href={item.newsUrl} target="_blank" rel="noopener noreferrer">Financial Report</a> {/* Link to fiancial report */}
            
            {/* Show edit and delete buttons only if user is logged in */}
            {/* {loggedInUser.isLoggedIn && (
              <div>
                <button className="actionButton" onClick={() => onEditClick(item)}><FontAwesomeIcon icon={faPen}/></button>
                <button className="actionButton" onClick={() => onViewClick(item)}><FontAwesomeIcon icon={faEye}/></button>
                <button className="actionButton" onClick={() => onDeleteClick(item.newsID)}><FontAwesomeIcon icon={faTrash} /></button>
              </div>
            )}
          </div> */}
        {/* ))}
      </div> */} 

    </div>
        </>
    );
  }
  
  export default Dashboard;