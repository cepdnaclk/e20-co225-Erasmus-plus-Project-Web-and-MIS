//TODO: Update Media Queries in a meaningful way  

import style from './Workplan.module.css'

function Workplan() {  
  
    return(
      <>
        <div className={style["workplanTitle"]}>
            <h3>Work Plan</h3>
            <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="http://localhost:5173/"> 
                <span style={{ fontSize: 16}}>Home</span>
              </a>
            </li>
            <li className="breadcrumb-item active">
                <span style={{ fontSize: 16}}> Project Overview</span>
            </li>
            <li className="breadcrumb-item active">
              <span style={{ fontSize: 16}}> Work Plan</span>
            </li>
          </ol>
        </nav>
        </div>
        <div className={style["tableContainerOuter"]}>
            <div className={style["tableContainerInner"]}>
            <table className={style["table"]}>
              <thead>
                        <tr>
                            <th scope="col" colSpan={2} rowSpan={2}>Activity</th>
                            <th scope="col" colSpan={4} >Year 1</th>
                            <th scope="col" colSpan={4}>Year 2</th>
                            <th scope="col" colSpan={4}>Year 3</th>        
                        </tr>
                        <tr>
                            <th scope="col">Q1</th>
                            <th scope="col">Q2</th>
                            <th scope="col">Q3</th>
                            <th scope="col">Q4</th>
                            <th scope="col">Q1</th>
                            <th scope="col">Q2</th>
                            <th scope="col">Q3</th>
                            <th scope="col">Q4</th>
                            <th scope="col">Q1</th>
                            <th scope="col">Q2</th>
                            <th scope="col">Q3</th>
                            <th scope="col">Q4</th>                  
                        </tr> 
              </thead>
              <tbody>
              <tr>                      
                      <td>T1.1</td>
                      <td>Development of Project Management Plan</td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>                      
                  </tr>
                  <tr>                      
                      <td>T1.2</td>
                      <td>Administrative Coordination</td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>   
                  </tr>
                	<tr>                      
                      <td>T1.3</td>
                      <td>Risk Management</td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td> 
                  </tr>
                  <tr>                      
                      <td>T1.4</td>
                      <td>Communication and Conflict Resolution</td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td> 
                  </tr>
                  <tr>                      
                      <td>T1.5</td>
                      <td>Project meetings (M3, M7, M18, M36)</td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td> 
                  </tr>
                  <tr>                      
                      <td>T1.6</td>
                      <td>Quality assurance plan and continuous quality control</td>                     
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td> 
                  </tr>
                  <tr>                      
                      <td>T2.1</td>
                      <td>Identification of a. similar curricula and b.professional training courses in cybersecurity Asia</td>                      
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>                      
                      <td>T2.2</td>
                      <td>Identification of demand for internships in the Partner Countries</td>                      
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>                      
                      <td>T2.3</td>
                      <td>Registry of cybersecurity educational and training
                      offerings</td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>                      
                      <td>T3.1</td>
                      <td>Training Workshops in Europe for Curriculum
                      Development</td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>                      
                      <td>T3.2</td>
                      <td>Development of the e-learning platform</td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>                      
                      <td>T3.3</td>
                      <td>Online learning- Training workshops in Asia for the Asian academic staff -Guidelines for innovative teaching methods</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>                      
                      <td>T3.4</td>
                      <td>Curriculum development & Theoritical learning content</td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>                      
                      <td>T3.5</td>
                      <td>Creation of a freely accessible Cybersecurity</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>                      
                      <td>A4.1</td>
                      <td>Professional Courses Outline</td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>                
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>                      
                      <td>A4.2</td>
                      <td>Development of cybersecurity learning material for professionals</td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>                      
                      <td>A4.3</td>
                      <td>Integration of the learning materials into the e-learning platform</td>                      
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>     
                  <tr>                      
                      <td>A4.4</td>
                      <td>Launch of the 1st pilot of training programmes for re-skilling of the cybersecurity professionals</td>                      
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>                      
                      <td>A4.5</td>
                      <td>Launch of the 2nd pilot of training programmes for re-skilling of the cybersecurity professionals & upskilling of people who want to work in the field of cybersecurity</td>                    <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>                      
                      <td>A5.1</td>
                      <td>Accreditation of the cybersecurity MSc Programme</td>                      
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>                      
                      <td>A5.2</td>
                      <td>Delivery of the cybersecurity MSc Programme</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>                     
                  </tr>
                  <tr>                      
                      <td>A5.3</td>
                      <td>Evaluation and improvement of the Master's Programme</td>                      
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                  </tr>
                  <tr>                      
                      <td>A6.1</td>
                      <td>Strategic Planning and Monitoring: Dissemination Plan</td>                      
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>                      
                      <td>A6.2</td>
                      <td>CYCLE Website</td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                  </tr>
                  <tr>                      
                      <td>A6.3</td>
                      <td>Development of the social media campaign</td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>                      
                      <td>A6.4</td>
                      <td>Dissemination activities</td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td> 
                  </tr>
                  <tr>                      
                      <td>A6.5</td>
                      <td>Outreach and motivation strategy to encourage women & vulnerable groups</td>                      
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>                      
                      <td>A6.6</td>
                      <td>Organisation of Final Conference</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className={style["tdColored"]}></td>
                  </tr>
                  <tr>                      
                      <td>A6.7</td>
                      <td>Exploitation and Sustainability Plan</td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td> 
                  </tr>
                  <tr>                      
                      <td>A6.8</td>
                      <td>Monitoring of dissemination and exploitation activities</td>                      
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td>
                      <td className={style["tdColored"]}></td> 
                  </tr>
              </tbody>
            </table>
            </div>
      </div>

      </>
    );
  }
  
  export default Workplan;