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
            <nav className = "navbar">
                <ul>
                    <li><a href = "index.html">HOME</a></li>
                    <li className = "dropdown">
                    <a href = "">PROJECT OVERVIEW &nbsp; &nbsp; &#x25BC;</a>
                        <div className = "dropdown-content">
                            <a href = "projectOverview.html">Project Overview</a>
                            <a href = "#">Cycle Workplan</a>
                            <a href = "#">Deliverables</a>
                        </div>
                        </li>
                    <li><a href = "team.html">TEAM</a></li>
                    <li className = "dropdown">
                    <a href = "#">NEWS & EVENTS &nbsp; &nbsp; &#x25BC;</a>
                        <div className = "dropdown-content">
                            <a href = "#">News & Events</a>
                            <a href = "#">Gallery</a>
                        </div>
                    </li>
                    <li><a href = "downloads">DOWNLOADS</a></li>
                    <li><a href = "">CONTACT</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header