import {loggedInUser} from '../Pages/Login'

function Gallery() {
  
    return(
      <>
      <h1>Gallery</h1>
      {console.log("loggedInUser :",loggedInUser)}
        </>
    );
  }
  
  export default Gallery;