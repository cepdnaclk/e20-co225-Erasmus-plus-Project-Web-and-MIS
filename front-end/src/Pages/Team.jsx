import DrUpulJayasinghe from '../assets/upul-jayasinghe.jpg';
import DrErunikaDayaratna from '../assets/erunika-dayaratna.jpg';
import TeamProfilePic from '../assets/TeamProfilePic.png';

function Team() {
  return(
    <>
    {/* Page title */}
    <div className = "TeamTitle">
      <h3>Team</h3>
    </div>

    {/* UoP Team Members */}
    <div className = "UoPTeam">
    
    <div className = "UoPTeamTitle">
      <h4>University of Peradeniya</h4>
    </div>


    <div className = "TeamSubTitle">
      <h4>Manager/Coordinators</h4>
    </div>


    <div className = "TeamCards">
    <div className = "TeamCard">
    <img className="TeamProfilePic" src={DrUpulJayasinghe} alt="DrUpulJayasinghe"/>
      <ul>
        <li className = "TeamMemberName">Dr. Upul Jayasinghe</li>
        <li>Manager</li>
        <li><a href="tel:+94760416590">+94 76 041 6590</a></li>
        <li><a href="mailto:eftu@eng.pdn.ac.lk">eftu@eng.pdn.ac.lk</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={DrErunikaDayaratna} alt="DrErunikaDayaratna"/>
      <ul>
        <li className = "TeamMemberName">Dr. Oshani Dayaratna</li>
        <li>Coordinator</li>
        <li><a href="tel:+94766986500">+94 76 698 6500</a></li>
        <li><a href="mailto:erunika.dayaratna@sci.pdn.ac.lk">erunika.dayaratna@sci.pdn.ac.lk</a></li>
      </ul>
    </div>
    </div>
    
    <div className = "TeamSubTitle">
      <h4>PGIS - Postgraduate Institute of Science</h4>
    </div>

    <div className = "TeamCards">
    <div className = "TeamCard">
    <img className="TeamProfilePic" src={TeamProfilePic} alt="TeamProfilePic"/>
      <ul>
        <li className = "TeamMemberName">Prof. HMTGA Pitawala, Director of PGIS</li>
        <li>Administrator</li>
        <li><a href="tel:+94703215056">+94 70 321 5056</a></li>
        <li><a href="mailto:apitawala@sci.pdn.ac.lk">apitawala@sci.pdn.ac.lk</a></li>
      </ul>
    </div>
    </div>

    <div className = "TeamSubTitle">
      <h4>Department of Computer Engineering</h4>
    </div>

    <div className = "TeamCards">
    <div className = "TeamCard">
    <img className="TeamProfilePic" src={TeamProfilePic} alt="TeamProfilePic"/>
      <ul>
        <li className = "TeamMemberName">Prof. Roshan Ragel</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94773857755">+94 77 385 7755</a></li>
        <li><a href="mailto:roshanr@eng.pdn.ac.lk">roshanr@eng.pdn.ac.lk</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={TeamProfilePic} alt="TeamProfilePic"/>
      <ul>
        <li className = "TeamMemberName">Prof. Manjula Sandirigama</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94777210546">+94 77 721 0546</a></li>
        <li><a href="mailto:manjula.sandirigama@gmail.com">manjula.sandirigama@gmail.com</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={DrUpulJayasinghe} alt="DrUpulJayasinghe"/>
      <ul>
        <li className = "TeamMemberName">Dr. Upul Jayasinghe</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94760416590">+94 76 041 6590</a></li>
        <li><a href="mailto:eftu@eng.pdn.ac.lk">eftu@eng.pdn.ac.lk</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={TeamProfilePic} alt="TeamProfilePic"/>
      <ul>
        <li className = "TeamMemberName">Dr. Asitha Bandaranayake</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94715117771">+94 71 511 7771</a></li>
        <li><a href="mailto:asithab@eng.pdn.ac.lk">asithab@eng.pdn.ac.lk</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={TeamProfilePic} alt="TeamProfilePic"/>
      <ul>
        <li className = "TeamMemberName">Dr. Namal Karunarathne</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94768321333">+94 76 832 1333</a></li>
        <li><a href="mailto:namal@eng.pdn.ac.lk">namal@eng.pdn.ac.lk</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={TeamProfilePic} alt="TeamProfilePic"/>
      <ul>
        <li className = "TeamMemberName">Dr. Isuru Nawinne</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94718495506">+94 71 849 5506</a></li>
        <li><a href="mailto:isurunawinne@eng.pdn.ac.lk">isurunawinne@eng.pdn.ac.lk</a></li>
      </ul>
    </div>
    </div>

    <div className = "TeamSubTitle">
      <h4>Department of Statistics & Computer Science</h4>
    </div>

    <div className = "TeamCards">
    <div className = "TeamCard">
    <img className="TeamProfilePic" src={TeamProfilePic} alt="TeamProfilePic"/>
      <ul>
        <li className = "TeamMemberName">Prof. Saluka Kodituwakku</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94718446875">+94 71 844 6875</a></li>
        <li><a href="mailto:salukak@sci.pdn.ac.lk">salukak@sci.pdn.ac.lk</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={TeamProfilePic} alt="TeamProfilePic"/>
      <ul>
        <li className = "TeamMemberName">Prof. Amalka Pinidiyaarachchi</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94718471071">+94 71 847 1071</a></li>
        <li><a href="mailto:amalka.uop@gmail.com">amalka.uop@gmail.com</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={TeamProfilePic} alt="TeamProfilePic"/>
      <ul>
        <li className = "TeamMemberName">Prof. Roshan D. Yapa</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94718184896">+94 71 818 4896</a></li>
        <li><a href="mailto:roshany@sci.pdn.ac.lk">roshany@sci.pdn.ac.lk</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={TeamProfilePic} alt="TeamProfilePic"/>
      <ul>
        <li className = "TeamMemberName">Dr. Sachith P. Abeysundara</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94774924770">+94 77 492 4770</a></li>
        <li><a href="mailto:sachitha@sci.pdn.ac.lk">sachitha@sci.pdn.ac.lk </a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={DrErunikaDayaratna} alt="DrErunikaDayaratna"/>
      <ul>
        <li className = "TeamMemberName">Dr. Erunika Dayaratna</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94766986500">+94 76 698 6500</a></li>
        <li><a href="mailto:erunika.dayaratna@sci.pdn.ac.lk">erunika.dayaratna@sci.pdn.ac.lk</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={TeamProfilePic} alt="TeamProfilePic"/>
      <ul>
        <li className = "TeamMemberName">Dr. Hakim Usoof</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94777380760">+94 77 738 0760</a></li>
        <li><a href="mailto:hakimu@gmail.com">hakimu@gmail.com</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={TeamProfilePic} alt="TeamProfilePic"/>
      <ul>
        <li className = "TeamMemberName">Dr. Ruwan Nawarathna</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94713982575">+94 71 398 2575</a></li>
        <li><a href="mailto:ruwan.nawarathna@gmail.com">ruwan.nawarathna@gmail.com </a></li>
      </ul>
    </div>

    </div>

    </div>

    </>
  );
}

export default Team;