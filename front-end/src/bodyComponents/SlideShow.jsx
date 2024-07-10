// import React from 'react';
import { Fade ,Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


//assuminng we are getting a list of Image URL's and captions
const Slideshow = ({imageList}) => {
  return (

<div className="slide-container" style={{width:'100%', margin:"0.3% 3% 3% 0%"} }>
      <Slide>
        {imageList.map((fadeImage, index) => (
          <div key={index}>
            <img style={{ width: '100%' }} src={fadeImage.url} />
            <h2>{fadeImage.caption}</h2>
          </div>
        ))}
      </Slide>
    </div>
  )
}

export default Slideshow;