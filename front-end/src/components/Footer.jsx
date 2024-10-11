import peraLogo from '../assets/pera.png'; 
import fbLogo from '../assets/fb.png';
import ytLogo from '../assets/YouTube-logo.png';
import XLogo from '../assets/XLogo.png';
import {Link, Outlet} from 'react-router-dom'; 
import style from './Footer.module.css'

function Footer() {
    return (
        <footer className={style["footer"]}> 
            <div className={style["footer-nav"]}>

                {/* Logo Section with University of Peradeniya and Project Details */}
                <div classname = {style["footer-logo"]}>
                    <img className={style["pera-logo"]} src={peraLogo} alt="pera logo" /> {/* UoP logo */}
                    {/* Content which comes under (Uni Name, Project, Project Number) UoP logo */}
                    <p className= {style["logo-content"]}><p>University of Peradeniya</p> 
                        <p>ERASMUS+ CYCLE Project</p>
                        <p>Project Number: GAP-101128627</p>
                    </p>
                </div>

                {/* Main Navigation Section */}
                <nav>
                    <h6>Main Navigation</h6>
                    <ul>
                        <li><Link to = '/'>Home</Link></li>
                        <li><Link to = '/project Overview/Overview'>Project Overview</Link></li>
                        <li><Link to = '/contact'>Contact</Link></li>
                    </ul>
                </nav>

                {/* Quick Links Section */}
                <nav>
                    <h6>Quick Links</h6>
                    <ul>
                        <li><a href="https://erasmus-plus.ec.europa.eu/projects/search/details/101128627">Erasmus+ CYCLE</a></li>
                        <li><a href="http://www.pgis.pdn.ac.lk/">Postgraduate Institute of Science</a></li>
                        <li><a href="https://www.ce.pdn.ac.lk/">Department of Computer Engineering</a></li>
                        <li><a href="https://sci.pdn.ac.lk/scs/">Department of Statics & Computer Science</a></li>
                        <li><a href="https://inro.pdn.ac.lk/">International Relations Office</a></li>
                        <li><a href="https://www.ugc.ac.lk/">University Grants Commission</a></li>
                    </ul>
                </nav>

                {/* Contact Information Section */}
                <nav>
                    <h6>Contact</h6>
                    <ul>
                        {/* Manager Contact Info */}
                        <li>Manager: <a href="https://people.ce.pdn.ac.lk/staff/academic/upul/">Dr. Upul Jayasinghe</a></li>
                        <li>Tel: <a href="tel:+94760416590">+94 76 0416 590</a></li>
                        <li>Email: <a href="mailto:upuljm@eng.pdn.ac.lk">upuljm@eng.pdn.ac.lk</a></li>

                        {/* Coordinator Contact Info */}
                        <li> Coordinator: <a href="https://sci.pdn.ac.lk/scs/staff/Erunika-Dayaratna">Dr. Erunika Dayaratna</a></li>
                        <li>Tel: <a href="tel:+94766986500">+94 76 698 6500</a></li>
                        <li>Email: <a href="mailto:dayaratna@sci.pdn.ac.lk">dayaratna@sci.pdn.ac.lk</a></li>
                    </ul>
                </nav>

                {/* Social Media Links Section */}
                <nav>
                    <h6>Social Media Links</h6>
                    <ul>
                        <li>University of Peradeniya</li>
                        <li>
                            <a href="https://www.facebook.com/UniversityOfPeradeniya">
                                <img className={style["fbLogo"]} src={fbLogo} alt="fbLogo"/>
                            </a>
                            <a href="https://www.youtube.com/@webteamuop2944">
                                <img className={style["ytLogo"]} src={ytLogo} alt="ytLogo"/>
                            </a>
                            <a href="https://x.com/DVC_Peradeniya">
                                <img className={style["XLogo"]} src={XLogo} alt="XLogo"/>
                            </a>
                        </li>
                        <li>Postgraduate Institute of Science</li>
                        <li>
                            <a href="https://www.facebook.com/pages/Postgraduate-Institute-of-Science/1846660975382081">
                                <img className={style["fbLogo"]} src={fbLogo} alt="fbLogo"/>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Footer's Copyright Information */}
            <p className = {style["footer-websiteName"]}import >Erasmus+ CYCLE Project &copy; {new Date().getFullYear()} - All Rights Reserved</p>
        </footer>
    );
}

export default Footer;
