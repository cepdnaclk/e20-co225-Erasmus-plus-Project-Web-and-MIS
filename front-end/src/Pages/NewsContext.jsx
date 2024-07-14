import React, { createContext, useState, useEffect, useContext } from 'react';

const NewsContext = createContext();

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      console.log('Fetching news started');
      const start = performance.now();

      try {
        const response = await fetch('http://localhost:8080/api/v1/news');
        const data = await response.json();
        setNews(data);
        localStorage.setItem('news', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching news:', error);
      }

      const end = performance.now();
      console.log(`Fetching news ended. Time taken: ${end - start} ms`);
    };

    const savedNews = localStorage.getItem('news');
    if (savedNews) {
      setNews(JSON.parse(savedNews));
    } else {
      fetchNews();
    }
  }, []);

  return (
    <NewsContext.Provider value={news}>
      {children}
    </NewsContext.Provider>
  );
};
