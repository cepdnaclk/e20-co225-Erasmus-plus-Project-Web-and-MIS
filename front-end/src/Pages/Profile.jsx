import style from "../components/Profile.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

/*Profile Page */
function Profile() {
    const user =JSON.parse(localStorage.getItem("loggedInUser"))
    return(
      <>
      <div className="pageTitle">
          <h3>Profile</h3>
    </div>
    <div className={style["profileDetails"]}>
        <div className={style["userAccountInfo"]}>
            {/* Display profile picture if available */}
            {user.profilePicture ? (
                <img 
                    src={user.profilePicture.props.src} 
                    alt="User Profile" 
                    style={{ 
                        width: '150px', 
                        height: '150px', 
                        borderRadius: '50%', 
                        
                    }} 
                    referrerPolicy="no-referrer" 
                />
            ) : (
                <FontAwesomeIcon icon={faUserCircle} size="3x" style={{ marginRight: '10px' }} />
            )}
            
            {/* Display user name */}
            <h3 style={{
                        fontWeight: '500',
                        fontSize: '50px',
                        fontFamily: 'Caudex',
                        color: '#172554',
                        padding: '0 0 0 50px'
                    }} >{user.firstName} {user.lastName}</h3>
        </div>

    <div className="User-details">
        <h3><u><span style={{ color:'rgba(10, 48, 128)'}}>User Details</span></u></h3>
        <h4><span style={{ color:'hsl(107, 69%, 18%)'}}>Email: <br></br>{user.email}</span></h4>
            
        <h4><span style={{ color:'hsl(107, 69%, 18%)'}}>User Role: <br></br>{user.userRole}</span></h4>
    </div>
    </div>
    </>
    );
  }
  
  export default Profile;