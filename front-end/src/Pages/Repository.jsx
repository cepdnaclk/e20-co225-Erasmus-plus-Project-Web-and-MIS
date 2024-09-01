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
                </a>

                {/* Right Button */}
                <a href="https://link2.com">
                    <button className={style["RepoButton"]}>UOP Working Folder</button>
                </a>
            </div>
        </>
    );
  }
  
  export default Repository;