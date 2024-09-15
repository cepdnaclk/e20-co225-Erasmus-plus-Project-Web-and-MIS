import style from "../components/Repository.module.css";

function Repository() {
    return(
      <>
      <div className={style["RepositoryTitle"]}>
          <h3>Repository</h3>
      </div>
      <div className={style["ButtonContainer"]}>
                {/* Left Button */}
                <a href="https://link1.com">
                    <button className={style["RepoButton"]}>CYCLE Data</button>
                    <iframe src="https://drive.google.com/embeddedfolderview?id=1IF5E0G3l7Bk_pPz27VW6zSeQyCeXuoqJ#list" style={{border: "0", width:"98%", height:"200px", margin:"0% 0% 0% 3%",frameborder:"0", scrolling:"no"}}></iframe>
                </a>

                {/* Right Button */}
                {/* <a href="https://link2.com">
                    <button className={style["RepoButton"]}>UOP Working Folder</button>
                </a> */}
            </div>
        </>
    );
  }
  
  export default Repository;