import Slideshow from "../bodyComponents/SlideShow";
import style from './Home.module.css'
import ParticipantMap from '../bodyComponents/participantMap.jsx';

// this has to be imported from backend
const fadeImages = [
  {
    url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'First Slide'
  },
  {
    url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    caption: 'Second Slide'
  },
  {
    url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'Third Slide'
  },
];

//partner logos

const partnerInfo = [

{
  imagePath: 'src/assets/partnerLogos/University of Peradeniya Logo.png',
  url:"",
  caption: 'University of Peradeniya',
  country:  'Sri Lanka(UoP)',
  position:[7.2549,80.5974]

},
{
  imagePath: 'src/assets/partnerLogos/University of Colombo.PNG',
  url:"",
  caption: 'University of Colombo', 
  country:'Sri Lanka(UoC)',
  position:[6.900777,79.860133]
},
{
  imagePath: 'src/assets/partnerLogos/KMITL-Main-Logo.png',
  url:"",
  caption: 'King Mongkut\'s Institute of Technology Ladkrabang',
  country: 'Thailand',
  position:[13.7299, 100.7782]
},
{
  imagePath: 'src/assets/partnerLogos/LOGO Hanoi University of Industry.jpg',
  url:"",
  caption: 'TRUONG DAI HOC CONG NGHIEP HA NOI',
  country: 'Vietnam',
  position:[21.0537, 105.7351]
},
{
  imagePath: 'src/assets/partnerLogos/Logo-Nguyen-Tat-Thanh University.jpg',
  url:"",
  caption: 'NGUYEN TAT THANH University',
  country: 'Vietnam',
  position:[10.7610, 106.7102]
},
{
  imagePath: 'src/assets/partnerLogos/NTNU hovedlogo - farger - bredde.png',
  url:"",
  caption: 'NORGES TEKNISK-NATURVITENSKAPELIGE University N',
  country:'Norway',
  position:[63.4183,10.4014]
},
{
  imagePath: 'src/assets/partnerLogos/university_of_piraeus.jpg',
  url:"",
  caption: 'University of Piraeus Research Center',
  country:'Greece',
  position:[37.9416, 23.6530]
},
{
  imagePath: 'src/assets/partnerLogos/University of Colombo.PNG',
  url:"",
  caption: 'university',
  country:'country',
  position:[37.9416, 23.6530]

},
{
  imagePath: 'src/assets/partnerLogos/University of Colombo.PNG',
  url:"",
  caption: 'university',
  country:'country',
  position:[37.9416, 23.6530]

},
{
  imagePath: 'src/assets/partnerLogos/University of Colombo.PNG',
  url:"",
  caption: 'university',
  country:'country',
  position:[37.9416, 23.6530]

}
]

function Home(){
  return(
      <>
      {/* image slider  */}
      <Slideshow imageList={fadeImages}></Slideshow>

      {/* project description */}
      <div style={{margin:"2% 2% 1% 5%"}}><span style={{fontWeight:'bold',fontSize: '26px'}}>Project description</span><br></br></div>
      <div style={{width:"90%",margin:"5%"}}><p>There is an increasing demand for cybersecurity professionals worldwide, however, in Asia Pacific the largest regional workforce gap of 1.42 million professionals exists. The <b>CYberseCurityLEarning: Master’s degree in Cybersecurity / CYCLE </b>consortium will produce <u>innovative MSc curricula in the cybersecurity</u>, which will incorporate the design thinking principles and courses on Artificial Intelligence, while it will also create a Regional Centre for Higher education & Training, a transnational/international cooperation platform that will serve as a regional knowledge/networking/innovation hub for the cybersecurity industry in Asia. The training materials will be supplemented <u>by Serious Games</u> that will reflect real market cases from Asian partner countries. The serious games will be delivered in e-learning platform, so as to engage users in solving problems using Design thinking.</p>
      </div>      
     
      {/* target groups */}
      <div style={{margin:"2% 2% 1% 5%"}}>
         <p>Target Groups</p>
              <ol>
              <li>MSC students</li>
              <li>Cybersecurity professionals in Asia</li>    
              <li>Academic & Administrative staff</li>    
              <li>Companies, representatives/ stakeholders in cybersecurity & AI</li>
              </ol>
      </div>   


      <div style={{margin:"5%"}}>
              <p>Project Summary</p> 
              {/* photo added here */}
      </div> 

      {/* google calender       */}
      <div style={{margin:"5%"}}>
              <p>Event Calender</p>
      </div>       

      {/* participant map */}
      <ParticipantMap partnerInfo={partnerInfo}/>

    
      {/* partner logos*/}

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
             <img src={partnerLogo.imagePath} style={{width: '100px' }} />
             </a>
             </center>
             </div>
         
         <div  style={{ height: '100px'}}>
          <center><h5>{partnerLogo.caption+" "+partnerLogo.country}</h5></center>
         
         </div>
        </div>
      ))}


      </div>
      </>
  );

}


export default Home;