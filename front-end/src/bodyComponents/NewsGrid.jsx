import React from 'react';
import { useNews } from '../Pages/NewsContext';
import style from './NewsGrid.module.css'; 
import {Link, Outlet} from 'react-router-dom';

/**
 * NewsGrid Component
 * 
 * This component displays the top 3 most recent news items in a grid format.
 * Each news item includes a title, date, author, and an image.
 * If no news is available, a loading message is displayed.
 *
 * @component
 * @returns {JSX.Element} A grid of news items.
 */

const NewsGrid = () => {

  const news = useNews();
  // Sort and get the top 3 most recent news items
  const sortedNews = news
    .slice()
    .sort((a, b) => b.newsID - a.newsID)
    .slice(0, 3);

  return (
      <div className={style["news-list"]}>
        {sortedNews.length > 0 ? (
          sortedNews.map((item, index) => (
            <div key={index} className={style.HoveringImg}>
              <Link to = '/news & events/news'>
            <div key={index} className={style["news-item"]}>

              {/* News cover image */}
              <img
                className={style["news-image"]} 
                src={`data:image/jpeg;base64,${item.newsCoverImage}`}
                alt={item.newsTitle}
              />

              {/* News details: Title, Date, and Author */}
              <div className={style["news-details"]}>
                <h3>{item.newsTitle}</h3>
                <p><b>Date:</b> {item.newsDate}</p>
                <p>By {item.newsAuthor}</p>
              </div>
            </div>
            </Link>
            </div>
          ))
        ) : (
          //If no news is available
          <p>Loading news...</p>
        )}
      </div>
  );
};

export default NewsGrid;
