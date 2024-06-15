import React, {useState} from 'react';
import {Link, Outlet} from 'react-router-dom';  // //Add page routing using router dom

import cylcleLogo from '../assets/CYCLE-logo.png';
import erasmusLogo from '../assets/erasmus-plus-logo.jpg';

function Header(){
    // Constants for hamburger menu
    const [menuOpen, setMenuOpen] = useState(false);

    // set hamburger menu to close when a link is clicked
    const handleLinkClick = () => {
        setMenuOpen(false);
    }

    return(
        <header>
            <div className='logo-block'>
            {/* Erasmus logo */}
            <a href = "https://erasmus-plus.ec.europa.eu/"><img src={erasmusLogo} alt="Erasmus+ Logo" className="Erasmus-plus-Logo"></img></a>

            {/* Main heading */}
            <h1><span style={{ color:'rgb(50, 78, 148)'}}>ERASMUS+</span> <span style={{ color:'rgba(44, 110, 11, 0.634)'}}>CYCLE</span></h1>

            {/* Cycle logo */}
            <img src={cylcleLogo} alt="Cycle Logo" className="Cycle-Logo"></img>
            </div>

            {/* Sub heading */}
            <h2><span style={{ color:'rgb(50, 78, 148)'}}>CYberseCurityLEarning: Master's degree in Cybersecurity</span></h2>

            {/* Navigation bar */}
            <nav className = "headerNavBar">
                <Link to = '/'></Link>

                {/* Hamburger menu */}
                <div className='menu' onClick={() => 
                    setMenuOpen(!menuOpen)
                }>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className= {menuOpen ? "open" : ""}>
                    <li><Link to = '/' onClick={handleLinkClick}>HOME</Link></li>
                    <li className = "headerDropDown">
                    <Link to = '#'>PROJECT OVERVIEW &nbsp; &nbsp; &#x25BC;</Link>
                        <div className = "dropdown-content">
                            <Link to = '/project overview/overview' onClick={handleLinkClick}>Overview</Link>
                            <Link to = '/project overview/workplan' onClick={handleLinkClick}>Cycle Workplan</Link>
                            <Link to = '/project overview/deliverables' onClick={handleLinkClick}>Deliverables</Link>
                        </div>
                        </li>
                    <li><Link to = '/team' onClick={handleLinkClick}>TEAM</Link></li>
                    <li className = "headerDropDown">
                    <Link to = '#'>NEWS & EVENTS &nbsp; &nbsp; &#x25BC;</Link>
                        <div className = "dropdown-content">
                            <Link to = '/news & events/news' onClick={handleLinkClick}>News & Events</Link>
                            <Link to = '/news & events/gallery' onClick={handleLinkClick}>Gallery</Link>
                        </div>
                    </li>
                    <li><Link to = '/downloads' onClick={handleLinkClick}>DOWNLOADS</Link></li>
                    <li><Link to = '/contact' onClick={handleLinkClick}>CONTACT</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header