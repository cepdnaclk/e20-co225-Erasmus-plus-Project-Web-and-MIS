import React, { useState } from 'react';

import DrUpulJayasinghe from '../assets/upul-jayasinghe.jpg';
import DrErunikaDayaratna from '../assets/erunika-dayaratna.jpg';
import ProfHMTGAPitawala from '../assets/TeamMembers/Pitawala.jpg';
import ProfRoshanRagel from '../assets/TeamMembers/roshanragel.jpg';
import ProfManjulaSandirigama from '../assets/TeamMembers/manjulasandirigama.png';
import DrAsithaBandaranayake from '../assets/TeamMembers/asithabandaranayake.jpg';
import DrNamalKarunarathne from '../assets/TeamMembers/sunethnamal.jpeg';
import DrIsuruNawinne from '../assets/TeamMembers/isurunawinne.png';
import ProfSalukaKodituwakku from '../assets/TeamMembers/salukakodithuwakku.jpg';
import ProfAmalkaPinidiyaarachchi from '../assets/TeamMembers/amalka.jpg';
import ProfRoshanDYapa from '../assets/TeamMembers/roshanyapa.jpg';
import DrSachithPAbeysundara from '../assets/TeamMembers/sachith.jpg';
import DrHakimUsoof from '../assets/TeamMembers/hakimusoof.jpg';
import DrRuwanNawarathna from '../assets/TeamMembers/ruwannawarathna.jpg';
import UoPLogo from '../assets/UoPCrest.png';

import UoCLogo from '../assets/UoCCrest.png';
import DrAjanthaAthukoralaUoC from '../assets/TeamMembers/AjanthaAthukoralaUoC.jpg';

import PRCLogo from '../assets/UoPiraeusResearchCenter.png';
import IliasMaglogiannisPRC from '../assets/TeamMembers/IliasMaglogiannisPRC.jpg';

import HUoILogo from '../assets/HUoICrest.png';
import LeVietAnh from '../assets/TeamMembers/LeVietAnh.jpg';

import SUoTLogo from '../assets/SuranareeUniversityofTechnologyCrest.png';
import DrWepawee from '../assets/TeamMembers/DrWepawee.png';

import NTNULogo from '../assets/NTNUCrest.png';
import SokratisKatsikas from '../assets/TeamMembers/SokratisKatsikas.jpg';

import KMIoTLLogo from '../assets/KMIoTLCrest.png';
import ProfPitchaP from '../assets/TeamMembers/ProfPitchaP.jpeg';

function Team() {

  // State to manage the active tab
  const [activeTab, setActiveTab] = useState('uop');

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return(
    <>
    {/* Page title */}
    
    <div className = "pageTitle">
      <h3>Team</h3>
      <nav>
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <a href="http://localhost:5173/"> 
          <span style={{ fontSize: 16}}>Home</span>
        </a>
      </li>
      <li className="breadcrumb-item active">
        <span style={{ fontSize: 16}}> Team</span>
      </li>
    </ol>
  </nav>
    </div>

    {/* Tabs for different teams */}
    <div className="TeamTabs">
    <button 
                className={activeTab === 'uop' ? 'active' : ''}
                onClick={() => handleTabChange('uop')}>
                <img className="UoPLogoTab" src={UoPLogo} alt="UoPLogo"/>
            </button>
            <button 
                className={activeTab === 'uoc' ? 'active' : ''}
                onClick={() => handleTabChange('uoc')}>
                <img className="UoCLogoTab" src={UoCLogo} alt="UoCLogo"/>
            </button>
            <button 
                className={activeTab === 'prc' ? 'active' : ''}
                onClick={() => handleTabChange('prc')}>
                <img className="PRCLogoTab" src={PRCLogo} alt="PRCLogo"/>
            </button>
            <button 
                className={activeTab === 'huoi' ? 'active' : ''}
                onClick={() => handleTabChange('huoi')}>
                <img className="HUoILogoTab" src={HUoILogo} alt="HUoILogo"/>
            </button>
            <button 
                className={activeTab === 'suot' ? 'active' : ''}
                onClick={() => handleTabChange('suot')}>
                <img className="SUoTLogoTab" src={SUoTLogo} alt="SUoTLogo"/>
            </button>
            <button 
                className={activeTab === 'ntnu' ? 'active' : ''}
                onClick={() => handleTabChange('ntnu')}>
                <img className="NTNULogoTab" src={NTNULogo} alt="NTNULogo"/>
            </button>
            <button 
                className={activeTab === 'kmio' ? 'active' : ''}
                onClick={() => handleTabChange('kmio')}>
                <img className="KMIoTLLogoTab" src={KMIoTLLogo} alt="KMIoTLLogo"/>
            </button>
      </div>

    {/* UoP Team Members */}

    {/* Content for each tab */}
    {activeTab === 'uop' && (
    <div className = "UoPTeam">

    <div className = "UoPLogoBlock">
    <a href = "https://www.pdn.ac.lk/"><img className="UoPLogo" src={UoPLogo} alt="UoPLogo"/> </a>
    </div>

    <div className = "TeamCards">
    <div className = "TeamSubTitle">
      <h4>Manager/Coordinators</h4>
    </div>
    <div className = "TeamCard">
    <img className="TeamProfilePic" src={DrUpulJayasinghe} alt="DrUpulJayasinghe"/>
      <ul>
        <li className = "TeamMemberName">Dr. Upul Jayasinghe</li>
        <li>Manager</li>
        <li><a href="tel:+94760416590">+94 76 041 6590</a></li>
        <li><a href="mailto:upuljm@eng.pdn.ac.lk">upuljm@eng.pdn.ac.lk</a></li>
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

   <div className = "TeamCards"> 
    <div className = "TeamSubTitle">
      <h4>PGIS - Postgraduate Institute of Science</h4>
    </div>

    
    <div className = "TeamCard">
    <img className="TeamProfilePic" src={ProfHMTGAPitawala} alt="Prof. H.M.T.G.A Pitawala"/>
      <ul>
        <li className = "TeamMemberName">Prof. H.M.T.G.A Pitawala, Director of PGIS</li>
        <li>Administrator</li>
        <li><a href="tel:+94703215056">+94 70 321 5056</a></li>
        <li><a href="mailto:apitawala@sci.pdn.ac.lk">apitawala@sci.pdn.ac.lk</a></li>
      </ul>
    </div>
    </div>

    <div className = "TeamCards">
    <div className = "TeamSubTitle">
      <h4>Department of Computer Engineering</h4>
    </div>

    
    <div className = "TeamCard">
    <img className="TeamProfilePic" src={ProfRoshanRagel} alt="Prof. Roshan Ragel"/>
      <ul>
        <li className = "TeamMemberName">Prof. Roshan Ragel</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94773857755">+94 77 385 7755</a></li>
        <li><a href="mailto:roshanr@eng.pdn.ac.lk">roshanr@eng.pdn.ac.lk</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={ProfManjulaSandirigama} alt="Prof. Manjula Sandirigama"/>
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
        <li><a href="mailto:upuljm@eng.pdn.ac.lk">upuljm@eng.pdn.ac.lk</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={DrAsithaBandaranayake} alt="Dr. Asitha Bandaranayake"/>
      <ul>
        <li className = "TeamMemberName">Dr. Asitha Bandaranayake</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94715117771">+94 71 511 7771</a></li>
        <li><a href="mailto:asithab@eng.pdn.ac.lk">asithab@eng.pdn.ac.lk</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={DrNamalKarunarathne} alt="Dr. Namal Karunarathne"/>
      <ul>
        <li className = "TeamMemberName">Dr. Namal Karunarathne</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94768321333">+94 76 832 1333</a></li>
        <li><a href="mailto:namal@eng.pdn.ac.lk">namal@eng.pdn.ac.lk</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={DrIsuruNawinne} alt="Dr. Isuru Nawinne"/>
      <ul>
        <li className = "TeamMemberName">Dr. Isuru Nawinne</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94718495506">+94 71 849 5506</a></li>
        <li><a href="mailto:isurunawinne@eng.pdn.ac.lk">isurunawinne@eng.pdn.ac.lk</a></li>
      </ul>
    </div>
    </div>

    <div className = "TeamCards">
    <div className = "TeamSubTitle">
      <h4>Department of Statistics & Computer Science</h4>
    </div>

    
    <div className = "TeamCard">
    <img className="TeamProfilePic" src={ProfSalukaKodituwakku} alt="Prof. Saluka Kodituwakku"/>
      <ul>
        <li className = "TeamMemberName">Prof. Saluka Kodituwakku</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94718446875">+94 71 844 6875</a></li>
        <li><a href="mailto:salukak@sci.pdn.ac.lk">salukak@sci.pdn.ac.lk</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={ProfAmalkaPinidiyaarachchi} alt="Prof. Amalka Pinidiyaarachchi"/>
      <ul>
        <li className = "TeamMemberName">Prof. Amalka Pinidiyaarachchi</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94718471071">+94 71 847 1071</a></li>
        <li><a href="mailto:amalka.uop@gmail.com">amalka.uop@gmail.com</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={ProfRoshanDYapa} alt="Prof. Roshan D. Yapa"/>
      <ul>
        <li className = "TeamMemberName">Prof. Roshan D. Yapa</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94718184896">+94 71 818 4896</a></li>
        <li><a href="mailto:roshany@sci.pdn.ac.lk">roshany@sci.pdn.ac.lk</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={DrSachithPAbeysundara} alt="Dr. Sachith P. Abeysundara"/>
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
    <img className="TeamProfilePic" src={DrHakimUsoof} alt="TDr. Hakim Usoof"/>
      <ul>
        <li className = "TeamMemberName">Dr. Hakim Usoof</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94777380760">+94 77 738 0760</a></li>
        <li><a href="mailto:hakimu@gmail.com">hakimu@gmail.com</a></li>
      </ul>
    </div>

    <div className = "TeamCard">
    <img className="TeamProfilePic" src={DrRuwanNawarathna} alt="Dr. Ruwan Nawarathna"/>
      <ul>
        <li className = "TeamMemberName">Dr. Ruwan Nawarathna</li>
        <li>Teacher/Trainer /Researcher</li>
        <li><a href="tel:+94713982575">+94 71 398 2575</a></li>
        <li><a href="mailto:ruwan.nawarathna@gmail.com">ruwan.nawarathna@gmail.com </a></li>
      </ul>
    </div>
    </div>
    </div>
    )}

    {/* University of Colombo */}
    {activeTab === 'uoc' && (
    <div className = "UoCTeam">
      <div className = "UoCLogoBlock">
      <a href = "https://cmb.ac.lk/"><img className="UoCLogo" src={UoCLogo} alt="UoCLogo"/> </a>
      </div>
      <div className = "UoCTeamCards"> 
    <div className = "UoCTeamSubTitle">
      <h4>University of Colombo</h4>
    </div>

    <div className = "UoCTeamCard">
    <img className="TeamProfilePic" src={DrAjanthaAthukoralaUoC} alt="Dr.Ajantha Athukorale"/>
      <ul>
        <li className = "TeamMemberName">Dr.Ajantha Athukorale</li>
        <li>Director</li>
        <li><a href="tel:+94112541245">+9411 254 1245</a></li>
        <li><a href="mailto:aja@ucsc.cmb.ac.lk">aja@ucsc.cmb.ac.lk</a></li>
      </ul>
    </div>
    </div>
    </div>
    )}

    {/* Piraeus Research Center*/}
    {activeTab === 'prc' && (
    <div className = "PRCTeam">
      <div className = "PRCLogoBlock">
      <a href = "https://www.unipi.gr/en/home/"><img className="PRCLogo" src={PRCLogo} alt="PRCLogo"/> </a>
      </div>
      <div className = "PRCTeamCards"> 
    <div className = "PRCTeamSubTitle">
      <h4>University of Piraeus Research Center</h4>
    </div>

    <div className = "PRCTeamCard">
    <img className="TeamProfilePic" src={IliasMaglogiannisPRC} alt="Prof. Ilias Maglogiannis"/>
      <ul>
        <li className = "TeamMemberName">Prof. Ilias Maglogiannis</li>
        <li>Professor</li>
        <li><a href="tel:+302104142517">+30 210 414 2517</a></li>
        <li><a href="mailto:imaglo@unipi.gr">imaglo@unipi.gr</a></li>
      </ul>
    </div>
    </div>
    </div>
    )}

    {/* Hanoi University of Industry*/}
    {activeTab === 'huoi' && (
    <div className = "HUoITeam">
      <div className = "HUoILogoBlock">
      <a href = "https://www.haui.edu.vn/vn"><img className="HUoILogo" src={HUoILogo} alt="HUoILogo"/> </a>
      </div>
      <div className = "HUoITeamCards"> 
    <div className = "HUoITeamSubTitle">
      <h4>Hanoi University of Industry</h4>
    </div>

    <div className = "HUoITeamCard">
    <img className="TeamProfilePic" src={LeVietAnh} alt="LeVietAnh"/>
      <ul>
        <li className = "TeamMemberName">Dr. Le Viet Anh</li>
        <li>Director</li>
        <li><a href="tel:+84945060689">+84 945 060 689</a></li>
        <li><a href="mailto:levietanh@haui.edu.vn">levietanh@haui.edu.vn</a></li>
      </ul>
    </div>
    </div>
    </div>
    )}

    {/* Suranaree University of Technology */}
    {activeTab === 'suot' && (
    <div className = "SUoTTeam">
      <div className = "SUoTLogoBlock">
      <a href = "https://www.sut.ac.th/"><img className="SUoTLogo" src={SUoTLogo} alt="SUoTLogo"/> </a>
      </div>
      <div className = "SUoTTeamCards"> 
    <div className = "SUoTTeamSubTitle">
      <h4>Suranaree University of Technology</h4>
    </div>

    <div className = "SUoTTeamCard">
    <img className="TeamProfilePic" src={DrWepawee} alt="DrWepawee"/>
      <ul>
        <li className = "TeamMemberName">Dr. Wipawee Usaha</li>
        <li>Director</li>
        <li><a href="tel:+66442241416">+66 442 241 416</a></li>
        <li><a href="mailto:cia@g.sut.ac.th">cia@g.sut.ac.th</a></li>
      </ul>
    </div>
    </div>
    </div>
    )}

    {/* NTNU */}
    {activeTab === 'ntnu' && (
    <div className = "NTNUTeam">
      <div className = "NTNULogoBlock">
      <a href = "https://www.ntnu.edu/"><img className="NTNULogo" src={NTNULogo} alt="NTNULogo"/></a>
      </div>
      <div className = "NTNUTeamCards"> 
    <div className = "NTNUTeamSubTitle">
      <h4>Norwegian University of Science and Technology</h4>
    </div>

    <div className = "NTNUTeamCard">
    <img className="TeamProfilePic" src={SokratisKatsikas} alt="SokratisKatsikas"/>
      <ul>
        <li className = "TeamMemberName">Prof. Sokratis Katsikas</li>
        <li>Professor</li>
        <li><a href="tel:+4791138581">+47 9113 8581</a></li>
        <li><a href="mailto:sokratis.katsikas@ntnu.no">sokratis.katsikas@ntnu.no</a></li>
      </ul>
    </div>
    </div>
    </div>
    )}

    {/* King Mongkut's Institute of Technology Ladkr */}
    {activeTab === 'kmio' && (
    <div className = "KMIoTLTeam">
      <div className = "KMIoTLLogoBlock">
      <a href = "https://www.kmitl.ac.th/"><img className="KMIoTLLogo" src={KMIoTLLogo} alt="KMIoTLLogo"/> </a>
      </div>
      <div className = "KMIoTLTeamCards"> 
    <div className = "KMIoTLTeamSubTitle">
      <h4>King Mongkut's Institute of Technology Ladkr</h4>
    </div>

    <div className = "KMIoTLTeamCard">
    <img className="TeamProfilePic" src={ProfPitchaP} alt="ProfPitchaP"/>
      <ul>
        <li className = "TeamMemberName">Dr. Pitcha Prasitmeeboon</li>
        <li>Vice President</li>
        <li><a href="tel:+23298000ext.2617">+2329 8000 ext.2617</a></li>
        <li><a href="mailto:pitcha.pr@kmitl.ac.th">pitcha.pr@kmitl.ac.th</a></li>
      </ul>
    </div>
    </div>
    </div>
    )}

    </>
  );
}

export default Team;