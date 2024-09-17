import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context to manage news data
const NewsContext = createContext();

// Custom hook to consume the NewsContext in other components
export const useNews = () => useContext(NewsContext);

// NewsProvider component to fetch and provide news data to its children
export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);

  // useEffect hook to fetch news data on component mount
  useEffect(() => {
    const fetchNews = async () => {
      console.log('Fetching news started');
      const start = performance.now();

      // Send GET request to fetch news from the backend API
      try {
        const response = await fetch('http://localhost:8080/api/v1/news', {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate', // Ensures fresh response
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }

      const end = performance.now();
      console.log(`Fetching news ended. Time taken: ${end - start} ms`);
    };

    fetchNews(); // Fetch news on component mount
  }, []);

  return (
    <NewsContext.Provider value={news}>
      {children}
    </NewsContext.Provider>
  );
};
