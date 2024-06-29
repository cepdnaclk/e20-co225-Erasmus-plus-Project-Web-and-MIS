import DrUpulJayasinghe from '../assets/upul-jayasinghe.jpg';
import DrErunikaDayaratna from '../assets/erunika-dayaratna.jpg';
import contactImg from '../assets/contactImg.jpg';
import tel from '../assets/tel.png';
import email from '../assets/email.png';
import profile from '../assets/profile.png';

function Contact() {
  
  return(
    <>
    <div className = "contactTitle"> {/* Page title */}
    <h3>Contact</h3>
    </div>

    <div className = "contactpage">
    <div className = "contactDetails">

    {/* Image and the contact details of the Project manager */}
    <div className = "contactManager"> 
    <img className="Dr-Upul-Jayasinghe-img" src={DrUpulJayasinghe} alt="DrUpulJayasinghe" /> 
      <h3>Manager</h3>
    <nav>
      <ul>
        <li><img className="profile" src={profile} alt="profile"/> <a href="https://people.ce.pdn.ac.lk/staff/academic/upul/">Dr. Upul Jayasinghe</a></li>
        <li><img className="tel" src={tel} alt="tel"/> <a href="tel:+94760416590">+94 76 0416 590</a></li>
        <li><img className="email" src={email} alt="email"/> <a href="mailto:eftu@eng.pdn.ac.lk">eftu@eng.pdn.ac.lk</a></li>
      </ul>
    </nav>
    </div>

    {/* Image and the contact details of the Project coordinator */}
    <div className = "contactCoordinator">
    <img className="Dr-Erunika-Dayaratna-img" src={DrErunikaDayaratna} alt="DrErunikaDayaratna" />
      <h3>Coordinator</h3>
    <nav>
      <ul>
        <li><img className="profile" src={profile} alt="profile"/> <a href="https://sci.pdn.ac.lk/scs/staff/Erunika-Dayaratna">Dr. Erunika Dayaratna</a></li>
        <li><img className="tel" src={tel} alt="tel"/> <a href="tel:+94766986500">+94 76 698 6500</a></li>
        <li><img className="email" src={email} alt="email"/> <a href="mailto:dayaratna@sci.pdn.ac.lk">dayaratna@sci.pdn.ac.lk</a></li>
      </ul>
    </nav>
    </div>
    </div>

    {/* Contact Us form */}
    <div className = "contactUsForm">
      <img className="contactImg" src={contactImg} alt="contactImg" /> 
      <form>
        <div className = "ContactUsTitle">
          <h3>Contact Us</h3>
        </div>
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

