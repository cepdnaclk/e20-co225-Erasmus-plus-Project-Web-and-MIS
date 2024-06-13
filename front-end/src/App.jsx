import {BrowserRouter, Routes, Route} from 'react-router-dom';  //Add page routing using router dom

import Header from "./Header";
import Footer from "./Footer";
import './Header.css'
import './Footer.css'

import Home from './Pages/Home';
import ProjectOverview from './Pages/ProjectOverview';
import Team from './Pages/Team';
import NewsAndEvents from './Pages/NewsAndEvents';
import Downloads from './Pages/Downloads';
import Contact from './Pages/Contact';
import Overview from './Pages/Overview';
import Workplan from './Pages/Workplan';
import Deliverables from './Pages/Deliverables';
import Error from './Pages/Error';


function App() {
  return(
    <>
    <BrowserRouter>
    <nav> <Header/> </nav>
      <Routes>
          <Route path = '/' element = {<Home />} />
          <Route path = 'project overview' element = {<ProjectOverview />}>
            <Route path = 'overview' element = {<Overview />}/>
            <Route path = 'workplan' element = {<Workplan />}/>
            <Route path = 'deliverbles' element = {<Deliverables />}/>
          </Route>
          <Route path = 'team' element = {<Team />} />
          <Route path = 'news' element = {<NewsAndEvents />} />
          <Route path = 'downloads' element = {<Downloads />} />
          <Route path = 'contact' element = {<Contact />} />
          <Route path = '*' element = {<Error />} />
      </Routes>
      <footer> <Footer/> </footer>  {/* Adding footer to all pages */}
    </BrowserRouter>
    </>
  )
  }

  export default App;
