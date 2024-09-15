import React from 'react';
import { useNews } from '../Pages/NewsContext';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const NewsSlideShow = () => {
  const news = useNews();

  return (
    <div>
      <div className="News">
       <div className="slide-container" style={{ width: '100%', margin:"0% 0% 0% 3%" }}>
         <Slide>
      {console.log(news)}
      {news.length > 0 ? (
        news.map((item, index) => (
          <div key={index} className="news-slide">
               <img src={`data:image/jpeg;base64,${item.newsCoverImage}`} alt={item.newsTitle} />
               <div className="news-content">
                 <h2>{item.newsTitle}</h2>
                 {/* <p>{item.newsDescription}</p> */}
                 <b><p>Date: {item.newsDate}</p></b>
                 <b><p>Author: {item.newsAuthor}</p></b>
                <a href={item.newsUrl} target="_blank" rel="noopener noreferrer">Read more</a>
              </div>
            </div>
        ))
      ) : (
        <p>Loading news...</p>
      )}
      </Slide>
    </div>
    </div>
    </div>
  );
};

export default NewsSlideShow;
