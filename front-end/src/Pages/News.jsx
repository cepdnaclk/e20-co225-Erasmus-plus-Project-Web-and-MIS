import React, {useEffect, useState} from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/news');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);


    return(
      <>
      <div className="News">
      <h3>News</h3>
      </div>
      <div className = "news-container">
        {news.map((item) => (
          <div key={item.newsID} className="news-tile">
            <img src ={item.newsCoverImage} alt={item.newsTitle}/>
            <h2>{item.newsTitle}</h2>
            <p>{item.newsDescription}</p>
            <b><p>Date: {item.newsDate}</p></b>
            <b><p>Author: {item.newsAuthor}</p></b>
            <a href={item.newsUrl} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </div>
      </>
    );
  }
  
  export default News;