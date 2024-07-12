import Slideshow from "../bodyComponents/SlideShow";
import style from './Home.module.css'
import ParticipantMap from '../bodyComponents/participantMap.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCalendar, faFolder, faMapMarkerAlt, faChartPie, faBullseye, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

// this has to be imported from backend 
// 1200px height images are idel
const fadeImages = [
  {
    url: 'https://lh3.googleusercontent.com/pw/AP1GczM5KKxhVpddOvmafamm46DH9DtSlJKvRTUcoibtfAmrs0ySHY0-KIND3m8kO8xNC5v0aRCSn0z4T3C9ub8iBIyI6vgq9XCWexwDvEt24miVwBLABA=w2400',
    caption: 'Third Slide'
  },
  {
    url: 'https://lh3.googleusercontent.com/pw/AP1GczOf4JkUYn4FXbDiHPPs5iy-EU_cS3YeO7X650OK1bGajP9ApyK5V4PKmQpnoIroDJb4QSRSZR_bG8KNpfY4PRJrAqA3wKZhUZRaGy4DaO5Nhvte8w=w2400',
    caption: 'Third Slide'
  },
  {
    url: 'https://lh3.googleusercontent.com/pw/AP1GczNKdk1z2rkWNBQ2zNRCdqWn_9KensUFqQ_AcjYPxVQV79vqJMnFImwFCYWh3ETzNxdTe9YDkbatKXq_eRgy2jas2ZrMmJbLjYjzKk5RIbWW8s2Org=w2400',
    caption: 'Third Slide'
  },
];

//partner logos

const partnerInfo = [

{
  imagePath: 'src/assets/partnerLogos/University of Peradeniya Logo.png',
  url:"https://www.pdn.ac.lk/",
  caption: 'University of Peradeniya',
  country:  'Sri Lanka(UoP)',
  position:[7.2549,80.5974]

},
{
  imagePath: 'src/assets/partnerLogos/University of Colombo.PNG',
  url:"https://cmb.ac.lk/",
  caption: 'University of Colombo', 
  country:'Sri Lanka(UoC)',
  position:[6.900777,79.860133]
},
{
  imagePath: 'src/assets/partnerLogos/piraeus.PNG',
  url:"https://www.unipi.gr/en/home/",
  caption: 'University of Piraeus Research Center',
  country:'Greece',
  position:[13.7299, 100.7782]
},
{
  imagePath: 'src/assets/partnerLogos/LOGO Hanoi University of Industry.jpg',
  url:"https://www.haui.edu.vn/vn",
  caption: 'TRUONG DAI HOC CONG NGHIEP HA NOI',
  country: 'Vietnam',
  position:[21.0537, 105.7351]
},
{
  imagePath: 'src/assets/partnerLogos/Logo-Nguyen-Tat-Thanh University.jpg',
  url:"https://ntt.edu.vn/en",
  caption: 'NGUYEN TAT THANH University',
  country: 'Vietnam',
  position:[10.7610, 106.7102]
},
{
  imagePath: 'src/assets/partnerLogos/logo_ntnu_u-slagord.png',
  url:"https://www.ntnu.edu/",
  caption: 'NORGES TEKNISK-NATURVITENSKAPELIGE University N',
  country:'Norway',
  position:[63.4183,10.4014]
},
{
  imagePath: 'src/assets/partnerLogos/KMITL-Main-Logo.png',
  url:"https://www.kmitl.ac.th/",
  caption: 'King Mongkut\'s Institute of Technology Ladkrabang',
  country: 'Thailand',
  position:[37.9416, 23.6530]
},
{
  imagePath: 'src/assets/partnerLogos/sqlearn-logo.PNG',
  url:"https://www.sqlearn.com",
  caption: 'SQLEARN AE',
  country:'Greece',
  position:[37.9416, 23.6530]

},
{
  imagePath: 'src/assets/partnerLogos/Suranee-logo.PNG',
  url:"https://www.sut.ac.th/",
  caption: 'Suranee University of Technology',
  country:'Greece',
  position:[37.9416, 23.6530]
},
// {
//   imagePath: 'src/assets/partnerLogos/University of Colombo.PNG',
//   url:"",
//   caption: 'university',
//   country:'country',
//   position:[37.9416, 23.6530]

// }
]

function Home(){
  return(
      <>
      {/* image slider  */}
      <Slideshow imageList={fadeImages}></Slideshow>

      {/* project description */}
      
      <div className={style["paragraph"]}>
      <div style={{margin:"2% 2% 2% 2%"}}><span style={{fontWeight:'bold',fontSize: '26px'}}>Project description</span><br></br></div>
        <p>There is an increasing demand for cybersecurity professionals worldwide,
         however, in Asia Pacific the largest regional workforce gap of 1.42 million professionals exists. 
         The <b>CYberseCurityLEarning: Master’s degree in Cybersecurity / CYCLE </b>
         consortium will produce <u>innovative MSc curricula in the cybersecurity</u>, 
         which will incorporate the design thinking principles and courses on Artificial Intelligence, 
         while it will also create a Regional Centre for Higher education & Training, a transnational/international 
         cooperation platform that will serve as a regional knowledge/networking/innovation hub for the cybersecurity 
         industry in Asia. The training materials will be supplemented <u>by Serious Games</u> that will reflect real market 
         cases from Asian partner countries. The serious games will be delivered in e-learning platform, so as to engage users 
         in solving problems using Design thinking.</p>
      </div>      
     
      {/* target groups */}
      <div className={style["paragraph"]}>
      <div style={{margin:"2% 2% 2% 2%"}}><span style={{fontWeight:'bold',fontSize: '24px'}}>Target Groups</span><br></br></div>
              <ol>
              <li>MSC students</li>
              <li>Cybersecurity professionals in Asia</li>    
              <li>Academic & Administrative staff</li>    
              <li>Companies, representatives/ stakeholders in cybersecurity & AI</li>
              </ol>
      </div>   

      {/* Project Summary */}
      <div className={style["paragraph"]}>
          <div style={{margin:"2% 2% 2% 2%"}}><span style={{fontWeight:'bold' ,fontSize: '24px'}}>Project Summary</span><br></br></div>
          <div className={style["projectSummaryFlex"]}>
              <div className={style["projectSummaryFlexItem"]}>
                    <FontAwesomeIcon icon={faBell} />
                    <div>
                      <p>Project Status</p>
                      <p className={style["bold"]}>Ongoing</p>
                    </div>
              </div>
              <div className={style["projectSummaryFlexItem"]}>
                    <FontAwesomeIcon icon={faCalendar} />
                    <div>
                      <span>Start date&nbsp;&nbsp;&nbsp;</span>
                      <span className={style["bold"]}>01-12-2023</span>
                      <br></br>
                      <span>End date &nbsp;&nbsp;&nbsp;</span>
                      <span className={style["bold"]}>30-11-2026</span>
                    </div>
              </div>
              <div className={style["projectSummaryFlexItem"]}>
                    <FontAwesomeIcon icon={faChartPie} />
                    <div>
                      <p>EU Grant</p>
                      <p className={style["bold"]}>793.032,00 €</p>
                    </div>
              </div>
              <div className={style["projectSummaryFlexItem"]}>
                    <FontAwesomeIcon icon={faFolder} />
                    <div>
                      <p>Programme</p>
                      <p className={style["bold"]}>Erasmus+</p>
                    </div>
              </div>
              <div className={style["projectSummaryFlexItem"]}>
                    <FontAwesomeIcon icon={faFolderOpen} />
                    <div>
                      <p>Key Action</p>
                      <p className={style["bold"]}>Partnerships for Cooperation and Exchanges of Practices</p>
                    </div>
              </div>
              <div className={style["projectSummaryFlexItem"]}>
                    <FontAwesomeIcon icon={faBullseye} />
                    <div>
                      <p>Action Type</p>
                      <p className={style["bold"]}>Capacity Building in Higher Education</p>
                    </div>
              </div>
              <div className={style["projectSummaryFlexItem"]}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <div>
                      <p>Countries Covered</p>
                      <p className={style["bold"]}>5</p>
                    </div>
              </div>
        </div>
      </div> 

      {/* google calender       */}

      <div style={{margin:"5%"}}>
      <div style={{margin:"2% 2% 2% 2%"}}><span style={{fontWeight:'bold',fontSize: '24px'}}>Event Calender</span><br></br></div>
      </div>       

      {/* participant map */}
      <div className={style["paragraph"]}>
      <div style={{margin:"2% 2% 2% 2%"}}><span style={{fontWeight:'bold',fontSize: '24px'}}>Participants map</span><br></br></div>
      <ParticipantMap partnerInfo={partnerInfo}/>
      </div>

      <div className={style["paragraph"]}>
      {/* partner logos*/}
      <div style={{margin:"0% 2% 4% 2%"}}><span style={{fontWeight:'bold',fontSize: '24px'}}>Our Partners</span><br></br></div>
     
      

    {/* to be displayed when screen is minimized */}
    
    <div className={style["partnersList"]}>
     <center><p>Our Partners</p></center>
     {partnerInfo.map((partners, index) => (
      <center><h5>{partners.caption+" "+partners.country}</h5></center>
     ))}
    </div>

    {/* partner logos which will be hidden when window is minimized */}
   <div className={style["partnerLogoImages"]}>
      
      {partnerInfo.map((partnerLogo, index) => (

        <div key={index} style={{ width: '20%',height:'230px'}}>
         
         <div key={index} className={style.HoveringImg}  > 
         <center>
             <a href = {partnerLogo.url}>
             <img src={partnerLogo.imagePath} style={{width: '100px', marginTop: "5px"}} />
             </a>
             </center>
             </div>
         
         <div  style={{ height: '100px'}}>
          <center><h5>{partnerLogo.caption+" "+partnerLogo.country}</h5></center>
         
         </div>
        </div>
      ))}


      </div>
      </div>
      </>
  );

}


export default Home;