import style from "../components/Repository.module.css";
import React, { useState } from 'react';

// Repository component to display various sections with embedded Google Drive folders
function Repository() {

  // State to manage the active tab
  const [activeTab, setActiveTab] = useState('uop');

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* Title of the Repository section */}
      <div className="pageTitle">
          <h3>Repository</h3>
      </div>
      

      {/* Tabs for different repositories */}
      <div className={style["RepoTabs"]}>
        <button 
          className={activeTab === 'uop' ? style.active : ''}
          onClick={() => handleTabChange('uop')}>
            <div className={style["RepositorySubTitle"]}>
              <h3>UOP Working Folder</h3>
            </div>
        </button>

        <button 
          className={activeTab === 'cycle' ? style.active : ''}
          onClick={() => handleTabChange('cycle')}>
            <div className={style["RepositorySubTitle"]}>
              <h3>CYCLE Data</h3>
            </div>
        </button>
      </div>

      {/* UOP Tab Content */}
      {activeTab === 'uop' && (
        <div>
          <div className={style["RepositorySuperSubTitle"]}>
            <h4>Proposal</h4>
          </div>
          <iframe 
            src="https://drive.google.com/embeddedfolderview?id=1EEitAz95vn4SFYBjCs3EhQocrWTqdeRi" 
            style={{border: "0", width: "98%", height: "390px", margin: "0% 0% 0% 10%", scrolling: "no"}}>
          </iframe>

          <div className={style["RepositorySuperSubTitle"]}>
            <h4>Working Project Folders</h4>
          </div>
          <iframe 
            src="https://drive.google.com/embeddedfolderview?id=1AGXqE6b97AOldcHFNmodrevUzPTGpXPG" 
            style={{border: "0", width: "98%", height: "260px", margin: "0% 0% 0% 10%", scrolling: "no"}}>
          </iframe>

          <div className={style["RepositorySuperSubTitle"]}>
            <h4>WP5</h4>
          </div>
          <iframe 
            src="https://drive.google.com/embeddedfolderview?id=1d85hXNPGQw6p3unb5nZp7O9DV-tnV0TM" 
            style={{border: "0", width: "98%", height: "300px", margin: "0% 0% 0% 10%", scrolling: "no"}}>
          </iframe>
        </div>
      )}

      {/* Cycle Tab Content */}
      {activeTab === 'cycle' && (
        <div>
          <iframe 
            src="https://drive.google.com/embeddedfolderview?id=1RzGm4lVDQRY-rmHXJhyUAzy_I2BYx4ve" 
            style={{border: "0", width: "98%", height: "600px", margin: "0% 0% 0% 3%", scrolling: "no"}}>
          </iframe>
        </div>
      )}
    </>
  );
}

export default Repository;
