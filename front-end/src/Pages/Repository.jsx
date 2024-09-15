import style from "../components/Repository.module.css";

function Repository() {
    return(
      <>
      <div className={style["RepositoryTitle"]}>
          <h3>Repository</h3>
      </div>
      <div>
            <iframe src="https://drive.google.com/embeddedfolderview?id=1IF5E0G3l7Bk_pPz27VW6zSeQyCeXuoqJ#list" style={{border: "0", width:"98%", height:"600px", margin:"0% 0% 0% 3%",frameborder:"0", scrolling:"no"}}></iframe>
      
     </div>
        </>
    );
  }
  
  export default Repository;