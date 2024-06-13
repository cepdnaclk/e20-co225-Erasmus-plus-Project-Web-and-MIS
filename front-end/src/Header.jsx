import {Link} from 'react-router-dom';  // //Add page routing using router dom

import cylcleLogo from './assets/CYCLE-logo.png';
import erasmusLogo from './assets/erasmus-plus-logo.jpg';

function Header(){
    return(
        <header>
            <div className='logo-block'>
            <a href = "https://erasmus-plus.ec.europa.eu/"><img src={erasmusLogo} alt="Erasmus+ Logo" className="Erasmus-plus-Logo"></img></a>
            <h1><span style={{ color:'rgb(50, 78, 148)'}}>ERASMUS+</span> <span style={{ color:'rgba(44, 110, 11, 0.634)'}}>CYCLE</span></h1>
            <img src={cylcleLogo} alt="Cycle Logo" className="Cycle-Logo"></img>
            </div>
            <h2><span style={{ color:'rgb(50, 78, 148)'}}>CYberseCurityLEarning: Master's degree in Cybersecurity</span></h2>
            <nav className = "headerNavBar">
                <ul>
                    <li><Link to = '/'>HOME</Link></li>
                    <li className = "headerDropDown">
                    <Link to = '/project overview'>PROJECT OVERVIEW &nbsp; &nbsp; &#x25BC;</Link>
                        <div className = "dropdown-content">
                            <Link to = '/project overview/overview'>Overview</Link>
                            <Link to = '/project overview/workplan'>Cycle Workplan</Link>
                            <Link to = '/project overview/deliverables'>Deliverables</Link>
                        </div>
                        </li>
                    <li><Link to = '/team'>TEAM</Link></li>
                    <li className = "headerDropDown">
                    <Link to = '/news'>NEWS & EVENTS &nbsp; &nbsp; &#x25BC;</Link>
                        <div className = "dropdown-content">
                            <Link to = '/news'>News & Events</Link>
                            <Link to = '/gallery'>Gallery</Link>
                        </div>
                    </li>
                    <li><Link to = '/downloads'>DOWNLOADS</Link></li>
                    <li><Link to = '/contact'>CONTACT</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header