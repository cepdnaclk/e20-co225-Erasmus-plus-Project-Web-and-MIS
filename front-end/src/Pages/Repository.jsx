import style from "../components/Repository.module.css";

// Repository component to display various sections with embedded Google Drive folders
function Repository() {
    return(
      <>
      {/* Title of the Repository section */}
      <div className={style["RepositoryTitle"]}>
          <h3>Repository</h3>
      </div>
      
      {/* Subtitle for the UOP Working Folder section */}
      <div className={style["RepositorySubTitle"]}>
        <h3>UOP Working Folder</h3>
      </div>

      {/* Subsection for Proposal */}
      <div className={style["RepositorySuperSubTitle"]}>
        <h4>Proposal</h4>
      </div>

      {/* Embedded Google Drive folder for Proposal */}
      <iframe src="https://drive.google.com/embeddedfolderview?id=1EEitAz95vn4SFYBjCs3EhQocrWTqdeRi" style={{border: "0", width:"98%", height:"390px", margin:"0% 0% 0% 10%",frameborder:"", scrolling:"no"}}></iframe>
      
      {/* Subsection for Templates */}
      <div className={style["RepositorySuperSubTitle"]}>
        <h4>Templates</h4>
      </div>
      <iframe src="https://drive.google.com/embeddedfolderview?id=1AGXqE6b97AOldcHFNmodrevUzPTGpXPG" style={{border: "0", width:"98%", height:"260px", margin:"0% 0% 0% 10%",frameborder:"0", scrolling:"no"}}></iframe>
      
       {/* Subsection for WP5 */}
      <div className={style["RepositorySuperSubTitle"]}>
        <h4>WP5</h4>
      </div>
      <iframe src="https://drive.google.com/embeddedfolderview?id=1d85hXNPGQw6p3unb5nZp7O9DV-tnV0TM" style={{border: "0", width:"98%", height:"300px", margin:"0% 0% 0% 10%",frameborder:"0", scrolling:"no"}}></iframe>

      {/* Subtitle for CYCLE Data section */}
      <div className={style["RepositorySubTitle"]}>
        <h3>CYCLE Data</h3>
      </div>
      <iframe src="https://drive.google.com/embeddedfolderview?id=1RzGm4lVDQRY-rmHXJhyUAzy_I2BYx4ve" style={{border: "0", width:"98%", height:"600px", margin:"0% 0% 0% 3%",frameborder:"0", scrolling:"no"}}></iframe>
        </>
    );
  }
  
  export default Repository;