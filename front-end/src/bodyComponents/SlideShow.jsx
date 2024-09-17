import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

/**
 * Slideshow Component
 *
 * This component renders a slideshow of images with captions. It uses the `Slide` 
 * component from the 'react-slideshow-image' library to create a sliding image effect.
 *
 * 
 * @param {Object[]} imageList - List of image objects to be displayed in the slideshow.
 * @returns {JSX.Element} A slideshow component with images and captions.
 */ 

const Slideshow = ({imageList}) => {
  return (
    <div className="slide-container" style={{width:'80%', margin:"0% 0% 0% 10%"} }>
      <Slide>
        {imageList.map((fadeImage, index) => (
          <div key={index}>
            <img style={{ width: '100%' }} src={fadeImage.url} />
            {/* Caption for the image [Optional] */}
            <h2>{fadeImage.caption}</h2>
          </div>
        ))}
      </Slide>
    </div>
  )
}

export default Slideshow;