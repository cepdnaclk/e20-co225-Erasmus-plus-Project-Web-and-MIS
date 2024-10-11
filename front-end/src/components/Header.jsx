import React, {useState, useEffect} from 'react';
import {Link, Outlet, useLocation,useNavigate} from 'react-router-dom';  
import axios from 'axios';
import Switch from "react-switch";
import cylcleLogo from '../assets/CYCLE-logo.png';
import erasmusLogo from '../assets/erasmus-plus-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faBell, faAngleRight, faUser, faUserCircle, faFile,faCalendarDays,faBars } from '@fortawesome/free-solid-svg-icons';
import { appUserRole } from '../Pages/Login';

// Global user state
export let loggedInUser = { isLoggedIn: false, name: '', email: '', appUserRole: ''};

function Header(){
    // State for hamburger menu
    const [menuOpen, setMenuOpen] = useState(false);

    // State for admin menu
    const [adminmenuOpen, setAdminMenuOpen] = useState(false);

   // State for login button visibility
    const [isVisible, setIsVisible] = useState(true);

    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/user-info', { withCredentials: true }) 
            .then(response => { 
                const userDataGoogle = response.data;

                // Store Google user data
                const googleUser = {
                    isLoggedIn: true,
                    name: userDataGoogle.name,
                    email: userDataGoogle.email,
                    profilePicture: userDataGoogle.picture && <img src={userDataGoogle.picture} alt="User Profile" referrerPolicy="no-referrer" />
                };

                // Fetch additional data from the backend using the email
                axios.get(`http://localhost:8080/api/v1/users?email=${userDataGoogle.email}`)
                    .then(backendResponse => {
                        const backendData = backendResponse.data;  
                        const user = backendData.find(user => user.email === userDataGoogle.email);
                        const appUserRole = user.appUserRole;
                            
    
                const userData = {
                    ...googleUser,
                    appUserRole
                };

                setUser(userData);
                loggedInUser = userData;
                
                setLoggedInUser(true);   // Update the login state

            })
            .catch(backendError => {
                console.error('Error fetching backend data:', backendError);
            });
    })
    .catch(error => {
        console.error('Error fetching Google user data:', error);
    });
}, []);






    

    // Get the current location
    const location = useLocation();
    //to navigate between pages
    const navigate = useNavigate();
    //Const for edit mode
    const [isEditMode, setIsEditMode] = useState(false);
    
    //Change the vie mode and the edit mode when the switch handle is toggled
    //Implement the edit mode of the website
    const handleToggle = (checked) => {
        setIsEditMode(checked);
        };
    // set hamburger menu to close when a link is clicked
    const handleLinkClick = () => {
        setMenuOpen(false);
        setAdminMenuOpen(false);
        setIsVisible(false);
    }

    const googleLogin = () => {
        // Redirect to the backend for Google login
        setIsVisible(false); 
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    }

    //For logout 
    const [logout, setLogout] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const [loggedInUserState,setLoggedInUser] = useState(loggedInUser.isLoggedIn); // if a user has logged in
    // Update the visibility of the login button based on the current location
    //TODO: if no logged user only
    
    useEffect(() => {
        if (location.pathname === '/login' || loggedInUser.isLoggedIn) {
            setIsVisible(false);   
            if (loggedInUser.isLoggedIn) {
                setLoggedInUser(true)
            }            
        } 
        else {
            setIsVisible(true);
        }
    })

    function logOut(){
        axios.get('http://localhost:8080/logout', { withCredentials: true })
        .then(() => {
            // Clear any frontend user state
            loggedInUser = { isLoggedIn: false, name: '', email: ''};
            setLoggedInUser(false);

            window.location.reload
            navigate('/')
            setShowAccount(false);
        })
        .catch(error => {
            console.error('Error during logout:', error);
        });
    }

    // functions for the visibility of chat,notifications and account info
    function showChatInterface(){
        setShowChat(previousShowChat=>!previousShowChat);
        setShowAccount(false);
        setShowNotifications(false);

    }

    function showAccountInterface(){
        setShowChat(false);
        setShowAccount(previousShowAccount=>!previousShowAccount)        
        setShowNotifications(false);
    }

    function showNotificationInterface(){
        setShowChat(false);
        setShowAccount(false);
        setShowNotifications(previousShowNotifications=>!previousShowNotifications)       
    }

  // Function to close the sidebar when clicking outside of it
function closeOnClickOutside(selector, toggleClass) {
    document.addEventListener('click', function(event) {
      const element = document.querySelector(selector);
      const isClickInside = element.contains(event.target);
      const isClickOnToggleButton = event.target.closest('.adminNavBarRight li'); // Update with the toggle button selector
  
      if (!isClickInside && !isClickOnToggleButton) {
        element.classList.add(toggleClass); // Add the class to hide the element
      }
    });
  }
  
  // Call the function for the notification and message boxes
  useEffect(() => {
    closeOnClickOutside('.sideBarNotifications-Open', 'sideBar-Close');
    closeOnClickOutside('.sideBarMessages-Open', 'sideBar-Close');
    closeOnClickOutside('.userAccount-Open', 'userAccount-Close');
}, []);

    return(
        <header>
            {/* Navigation bar */}
            <nav className = "headerNavBar">
                <Link to = '/'></Link>

                {/* Hamburger menu */}
                <div className='menu' onClick={() => 
                    setMenuOpen(!menuOpen)
                }>
                <FontAwesomeIcon icon={faBars} />   
                </div>

                <ul className= {`headerNavBarRight ${menuOpen ? "open" : ""}`}>

                    <li><Link to = '/' onClick={handleLinkClick}>Home</Link></li>
                                  
                    <li className = "headerDropDown">
                    <Link to = '#'>Project Overview &nbsp; &nbsp; &#x25BC;</Link>
                        <div className = "dropdown-content">
                            <Link to = '/project overview/overview' onClick={handleLinkClick}>Overview</Link>
                            <Link to = '/project overview/workplan' onClick={handleLinkClick}>Cycle Workplan</Link>
                            <Link to = '/project overview/deliverables' onClick={handleLinkClick}>Deliverables</Link>
                        </div>
                        </li>
                    <li><Link to = '/team' onClick={handleLinkClick}>Team</Link></li>
                    <li className = "headerDropDown">
                    <Link to = '#'>News & Events &nbsp; &nbsp; &#x25BC;</Link>
                        <div className = "dropdown-content">
                            <Link to = '/news & events/news' onClick={handleLinkClick}>News & Events</Link>
                            <Link to = '/news & events/gallery' onClick={handleLinkClick}>Gallery</Link>
                        </div>
                    </li>
                    <li><Link to = '/downloads' onClick={handleLinkClick}>Downloads</Link></li>
                    <li><Link to = '/contact' onClick={handleLinkClick}>Contact</Link></li>
                </ul>
            </nav>

            {/* Top Navigation Bar for Administration  */}
            <div>
                <nav class="adminNavBar" > 

                {loggedInUserState && (
                    <div className='adminmenu' style={{ marginLeft: '51px' }} onClick={() => 
                        setAdminMenuOpen(!adminmenuOpen)
                        }>
                        <FontAwesomeIcon icon={faBars} />   
                    </div>
                )} 
                <ul className= {`headerNavBarLeft ${adminmenuOpen ? "open" : ""}`}>
                    {/* Display Admin Nav Bar Left List Items here only if min-width: 968px and the user has logged in*/}
                    {loggedInUserState && <li className='adminNavBarLeftListItem'><Link to = '/admin/dashboard'>DASHBOARD</Link></li>}
                    {loggedInUserState && <li className='adminNavBarLeftListItem'><Link to = '/admin/project management'>PROJECT MANAGEMENT</Link></li>}
                    {loggedInUserState && <li className='adminNavBarLeftListItem'><Link to = '/admin/repository'>REPOSITORY</Link></li>}
                </ul>             
                {isVisible && <div className='top-login-bar'><button className="Login-button" onClick={googleLogin}>LOGIN</button></div>}
                    <div >
                        <ul className={loggedInUserState ? "adminNavBarRight":"non-logged-user-panel"}>                  
                            <span id="switchLabel">{isEditMode ? "Edit Mode" : "View Mode"}</span>
                            <li><Switch 
                                        onChange={handleToggle} 
                                        checked={isEditMode} 
                                        offColor="#888"
                                        onColor="#324e94"
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        activeBoxShadow ={null}
                                        height={18}
                                        width={30}                                    
                                />                       
                            
                            </li>                                            
                            <li onClick={showChatInterface}><FontAwesomeIcon icon={faMessage}/></li>
                            <li onClick={showNotificationInterface}><FontAwesomeIcon icon={faBell}/></li>
                            <li onClick={showAccountInterface}>
                                {loggedInUser.profilePicture ? (
                                    <img 
                                        src={loggedInUser.profilePicture.props.src} 
                                        alt="User Profile" 
                                        style={{ 
                                        width: '30px', 
                                        height: '30px', 
                                        borderRadius: '50%', 
                                        marginRight: '10px'
                                        }} 
                                    referrerPolicy="no-referrer" 
                                    />
                                ) : (
                            <FontAwesomeIcon icon={faUserCircle} size="lg" />
                                )}
                        </li>
                        </ul>                              
                    </div>                 
                                
                </nav>

                {/* User Account Dropdown Menu */}
                <div class= {showAccount ? "userAccount-Open" : "userAccount-Close"}>
                            
                <div className="userAccountInfo">
                    {/* Display profile picture if available */}
                    {loggedInUser.profilePicture ? (
                        <img 
                            src={loggedInUser.profilePicture.props.src} 
                            alt="User Profile" 
                            style={{ 
                                width: '50px', 
                                height: '50px', 
                                borderRadius: '50%', 
                                marginRight: '10px' 
                            }} 
                            referrerPolicy="no-referrer" 
                        />
                    ) : (
                        <FontAwesomeIcon icon={faUserCircle} size="3x" style={{ marginRight: '10px' }} />
                    )}
    
                    {/* Display user name */}
                    <h3>{loggedInUser.name} {loggedInUser.lastName}</h3>
                </div>

                    
                    <hr></hr>
                    <Link to = '/profile' onClick={handleLinkClick} className="userAccountContent">                             
                        <FontAwesomeIcon icon={faUser} className="icon" />
                        <p>Profile</p>    
                        <span><FontAwesomeIcon icon={faAngleRight}/></span>                         
                    </Link> 
                    <Link to = '/myfiles' onClick={handleLinkClick} className="userAccountContent">    
                        <FontAwesomeIcon icon={faFile} className="icon"/>                            
                        <p>My Files</p>    
                        <span><FontAwesomeIcon icon={faAngleRight}/></span>                         
                    </Link>
                    <a herf="#" className="userAccountContent"> 
                        <FontAwesomeIcon icon={faCalendarDays} className="icon"/>                            
                        <p>Calender</p>    
                        <span><FontAwesomeIcon icon={faAngleRight}/></span>                         
                    </a>
                    <hr></hr>
                    <a herf="#" className="userAccountContent" id="logoutText" onClick={logOut}>                              
                        <p>Log Out</p>                        
                    </a>                           
                            
                </div>

                {/* Side Bar - Notifications */}
                <div class= {showNotifications ? "sideBarNotifications-Open" : "sideBar-Close"}>
                            
                    <div className="siderBarTitle">
                        <h3>Notifications</h3>
                    </div>
                    <hr></hr>                       
                            
                </div>

                {/* Side Bar - chatBox */}
                <div class= {showChat ? "sideBarMessages-Open" : "sideBar-Close"}>
                            
                    <div className="siderBarTitle">
                        <h3>Messages</h3>
                    </div>
                    <hr></hr>                        
                </div>
            </div>

            
            
            <div className='logo-blockFull'>
            <div className='logo-block'>
            {/* Erasmus logo */}
            <a href = "https://erasmus-plus.ec.europa.eu/"><img src={erasmusLogo} alt="Erasmus+ Logo" className="Erasmus-plus-Logo"></img></a>


            {/* Cycle logo */}
            <img src={cylcleLogo} alt="Cycle Logo" className="Cycle-Logo"></img>
            </div>
            
            <div className='Heading'>
            {/* Main heading */}
            <h1><span style={{ color:'rgb(50, 78, 148)'}}>ERASMUS+</span> <span style={{ color:'rgba(44, 110, 11, 0.634)'}}>CYCLE</span></h1>
        
            {/* Sub heading */}
            <h2><span style={{ color:'rgb(50, 78, 148)'}}>CYberseCurityLEarning: Master's degree in Cyber security</span></h2>
            </div>
            </div>
            
        </header>
    );
}

export default Header;
