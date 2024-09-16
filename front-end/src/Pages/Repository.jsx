import style from "../components/Repository.module.css";

function Repository() {
    return(
      <>
      <div className={style["RepositoryTitle"]}>
          <h3>Repository</h3>
      </div>
      
      <div className={style["RepositorySubTitle"]}>
        <h3>UOP Working Folder</h3>
      </div>

      <div className={style["RepositorySuperSubTitle"]}>
        <h4>Proposal</h4>
      </div>
      <iframe src="https://drive.google.com/embeddedfolderview?id=1EEitAz95vn4SFYBjCs3EhQocrWTqdeRi" style={{border: "0", width:"98%", height:"390px", margin:"0% 0% 0% 10%",frameborder:"", scrolling:"no"}}></iframe>
      
      <div className={style["RepositorySuperSubTitle"]}>
        <h4>Templates</h4>
      </div>
      <iframe src="https://drive.google.com/embeddedfolderview?id=1AGXqE6b97AOldcHFNmodrevUzPTGpXPG" style={{border: "0", width:"98%", height:"260px", margin:"0% 0% 0% 10%",frameborder:"0", scrolling:"no"}}></iframe>
      
      <div className={style["RepositorySuperSubTitle"]}>
        <h4>WP5</h4>
      </div>
      <iframe src="https://drive.google.com/embeddedfolderview?id=1d85hXNPGQw6p3unb5nZp7O9DV-tnV0TM" style={{border: "0", width:"98%", height:"300px", margin:"0% 0% 0% 10%",frameborder:"0", scrolling:"no"}}></iframe>
      
      

      <div className={style["RepositorySubTitle"]}>
        <h3>CYCLE Data</h3>
      </div>
      <iframe src="https://drive.google.com/embeddedfolderview?id=1RzGm4lVDQRY-rmHXJhyUAzy_I2BYx4ve" style={{border: "0", width:"98%", height:"600px", margin:"0% 0% 0% 3%",frameborder:"0", scrolling:"no"}}></iframe>
        </>
    );
  }
  
  export default Repository;