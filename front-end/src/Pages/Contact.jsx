import DrUpulJayasinghe from '../assets/upul-jayasinghe.jpg';
import DrErunikaDayaratna from '../assets/erunika-dayaratna.jpg';
import contactImg from '../assets/contactImg.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons';

/*Contact Page*/ 
function Contact() {
  return(
    <>
    <div className = "pageTitle"> 
    <h3>Contact</h3>
    <nav>
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <a href="http://localhost:5173/"> 
          <span style={{ fontSize: 16}}>Home</span>
        </a>
      </li>
      <li className="breadcrumb-item active">
        <span style={{ fontSize: 16}}> Contact</span>
      </li>
    </ol>
  </nav>
    </div>

    <div className = "contactpage">

    <div className = "contactDetails">
    {/* Image and the contact details of the Project manager */}
    <div className = "contactManagerCoordinator"> 
      <img className="Dr-Upul-Jayasinghe-img" src={DrUpulJayasinghe} alt="DrUpulJayasinghe" /> 
      <div className = "contactMCDetails">
        <h3>Dr. Upul Jayasinghe</h3>
        <h4>Manager</h4>
        <p>Telephone Number: <a href="tel:+94760416590">+94 76 0416 590</a></p>
        <p>Email Address: <a href="mailto:upuljm@eng.pdn.ac.lk">upuljm@eng.pdn.ac.lk</a></p>
        <a href="https://people.ce.pdn.ac.lk/staff/academic/upul/"><FontAwesomeIcon className = "contactIcons" icon={faUser} /></a>
        <a href="tel:+94760416590"><FontAwesomeIcon className = "contactIcons" icon={faPhone} /></a>
        <a href="mailto:upuljm@eng.pdn.ac.lk"><FontAwesomeIcon className = "contactIcons" icon={faEnvelope} /></a>
      </div>

    </div>

    {/* Image and the contact details of the Project coordinator */}
    <div className = "contactManagerCoordinator">
      <img className="Dr-Erunika-Dayaratna-img" src={DrErunikaDayaratna} alt="DrErunikaDayaratna" />
      <div className = "contactMCDetails">
        <h3>Dr. Erunika Dayaratna</h3>
        <h4>Coordinator</h4>
        <p>Telephone Number: <a href="tel:+94766986500">+94 76 698 6500</a></p>
        <p>Email Address: <a href="mailto:dayaratna@sci.pdn.ac.lk">dayaratna@sci.pdn.ac.lk</a></p>
        <a href="https://sci.pdn.ac.lk/scs/staff/Erunika-Dayaratna"><FontAwesomeIcon className = "contactIcons" icon={faUser} /></a>
        <a href="tel:+94766986500"><FontAwesomeIcon className = "contactIcons" icon={faPhone} /></a>
        <a href="mailto:dayaratna@sci.pdn.ac.lk"><FontAwesomeIcon className = "contactIcons" icon={faEnvelope} /></a>
      </div>
    </div>
    </div>


    {/* Contact Us form */}
    <div className = "ContactUsTitle">
      <h3>Contact Us</h3>
      <p className = "ContactUsSubTitle">For inquiries or support, contact us and we'll respond promptly</p>
    </div>

    <div className = "contactUsForm">
      <img className="contactImg" src={contactImg} alt="contactImg" /> 
      <form>
        
        <div className = "inputbox">
        <label>Full Name</label>
        <input type = "text" className = "field" placeholder = "Enter your Full Name" name = "user_name" required/>
        </div>

        <div className = "inputbox">
        <label>Email Address</label>
        <input type = "email" className = "field" placeholder = "Enter your Email address" name = "user_email" required/>
        </div>

        <div className = "inputbox">
        <label>Subject</label>
        <input type = "text" className = "field" placeholder = " Enter the Subject" name = "subject" required/>
        </div>
        <div className = "inputbox">
        <label>Your Message</label>
        <textarea name = "message" id = "" className = "field mess" placeholder = "Enter your message" required></textarea>
        </div>
        <button type = "submit" className = "contactButton" >Send Message</button>
      </form>

    </div>
    </div>
    </>
  );
}

export default Contact;

