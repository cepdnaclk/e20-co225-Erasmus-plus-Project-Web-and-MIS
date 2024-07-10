import {BrowserRouter, Routes, Route} from 'react-router-dom';  //Add page routing using router dom

import Header from "./components/Header";
import Footer from "./components/Footer";
import './components/Header.css'
import './components/Overview.css'
import './components/Contact.css'
import './components/Team.css'
import './components/News.css'
import './components/Download.css'
import './components/Gallery.css'


import Login from './Pages/Login';
import Home from './Pages/Home';
import Team from './Pages/Team';
import News from './Pages/News';
import Gallery from './Pages/Gallery';
import Downloads from './Pages/Downloads';
import Contact from './Pages/Contact';
import Overview from './Pages/Overview';
import Workplan from './Pages/Workplan';
import Deliverables from './Pages/Deliverables';
import SharedLayoutProjectOverview from './Pages/SharedLayoutProjectOverview';
import SharedLayoutNewsAndEvents from './Pages/SharedLayoutNewsAndEvents';
import Error from './components/Error';
import Dashboard from './Pages/Dashboard';
import ProjectManagement from './Pages/ProjectManagement';
import Repository from './Pages/Repository';
import SharedLayoutAdmin from './Pages/SharedLayoutAdmin';

function App() {
  return(
    <>
    <BrowserRouter>
    <nav> <Header/> </nav>
      <Routes>
          <Route path = 'login' element = {<Login />} />
          <Route path = '/' element = {<Home />} />
          <Route path = 'project overview' element = {<SharedLayoutProjectOverview />}>
            <Route index element = {<SharedLayoutProjectOverview />}/>
            <Route path = 'overview' element = {<Overview />}/>
            <Route path = 'workplan' element = {<Workplan />}/>
            <Route path = 'deliverables' element = {<Deliverables />}/>
          </Route>
          <Route path = 'team' element = {<Team />} />
          <Route path = 'news & events' element = {<SharedLayoutNewsAndEvents />} >
            <Route index element = {<SharedLayoutNewsAndEvents />}/>
            <Route path = 'news' element = {<News />}/>
            <Route path = 'gallery' element = {<Gallery />}/>
          </Route>
          <Route path = 'downloads' element = {<Downloads />} />
          <Route path = 'contact' element = {<Contact />} />
          <Route path = '*' element = {<Error />} />
          <Route path = 'admin' element = {<SharedLayoutAdmin />}>
            <Route index element = {<SharedLayoutAdmin />}/>
            <Route path = 'dashboard' element = {<Dashboard />}/>
            <Route path = 'project management' element = {<ProjectManagement />}/>
            <Route path = 'repository' element = {<Repository />}/>
          </Route>
      </Routes>
      <footer> <Footer/> </footer>  {/* Adding footer to all pages */}
    </BrowserRouter>
    </>
  )
  }

  export default App;
