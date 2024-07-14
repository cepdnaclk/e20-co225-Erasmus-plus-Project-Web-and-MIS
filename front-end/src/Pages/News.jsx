import React, { useEffect, useState } from "react";
import axios from "axios";
import { loggedInUser } from '../Pages/Login';

const fetchNews = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/news');
    return response.data.sort((a, b) => b.newsID - a.newsID);
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

const News = () => {

  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const latestNews = await fetchNews();
      setNews(latestNews);
    };

    getNews();
  }, []);


  // Visibility of Add news button
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (location.pathname === '/news' || loggedInUser.isLoggedIn) {
        setIsVisible(true);             
    } 
    else {
        setIsVisible(false);
    }
})

  const openFormInNewWindow = () => {
    const width = 700;
    const height = 750;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const newWindow = window.open('', '', `width=${width},height=${height},left=${left},top=${top}`);
    newWindow.document.write(`
      <html>
        <head>
          <title>Add News Form</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              padding: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            .add-news-form {
              background-color: #ffffff;
              padding: 20px;
              border: 1px solid #cccccc;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              width: 700px;
            }
            .add-news-form h2 {
              font-size: 2rem;
              margin-bottom: 20px;
            }
            .form-group {
              margin-bottom: 15px;
            }
            .form-group label {
              display: block;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .form-group input[type="text"],
            .form-group input[type="url"],
            .form-group input[type="date"],
            .form-group textarea {
              width: 100%;
              padding: 8px;
              font-size: 1rem;
              border: 1px solid #cccccc;
              border-radius: 4px;
            }
            .form-buttons {
              margin-top: 20px;
            }
            .form-buttons button {
              padding: 10px 20px;
              margin-right: 10px;
              font-size: 1rem;
              background-color: #203a90;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
            .form-buttons button[type="button"] {
              background-color: #6c757d;
            }
            .form-buttons button:hover {
              opacity: 0.8;
            }
            @media (max-width: 768px) {
              .add-news-form {
                padding: 15px;
              }
              .form-group input[type="text"],
              .form-group input[type="url"],
              .form-group input[type="date"],
              .form-group textarea {
                font-size: 0.9rem;
              }
            }
          </style>
        </head>
        <body>
          <div class="add-news-form">
            <h2>Add News</h2>
            <form id="add-news-form" onsubmit="handleSubmit(event)">
              <div class="form-group">
                <label for="newsTitle">Title:</label>
                <input type="text" id="newsTitle" name="newsTitle" required />
              </div>
              <div class="form-group">
                <label for="newsDescription">Description:</label>
                <textarea id="newsDescription" name="newsDescription" required></textarea>
              </div>
              <div class="form-group">
                <label for="newsUrl">URL:</label>
                <input type="url" id="newsUrl" name="newsUrl" required />
              </div>
              <div class="form-group">
                <label for="newsAuthor">Author:</label>
                <input type="text" id="newsAuthor" name="newsAuthor" required />
              </div>
              <div class="form-group">
                <label for="newsDate">Date:</label>
                <input type="date" id="newsDate" name="newsDate" required />
              </div>
              <div class="form-group">
                <label for="newsCoverImage">Cover Image URL:</label>
                <input type="url" id="newsCoverImage" name="newsCoverImage" required />
              </div>
              <div class="form-buttons">
                <button type="submit">Add News</button>
                <button type="button" onclick="window.close()">Cancel</button>
              </div>
            </form>
          </div>
          <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
          <script>
            function handleSubmit(event) {
              event.preventDefault();
              const form = event.target;
              const newsData = {
                newsTitle: form.newsTitle.value,
                newsDescription: form.newsDescription.value,
                newsUrl: form.newsUrl.value,
                newsAuthor: form.newsAuthor.value,
                newsDate: form.newsDate.value,
                newsCoverImage: form.newsCoverImage.value,
              };

              axios.post('http://localhost:8080/api/v1/news', newsData)
                .then(response => {
                  window.close();
                  if (window.opener && !window.opener.closed) {
                    window.opener.location.reload(); // Reload the main window
                  }
                })
                .catch(error => {
                  console.error('Error adding news:', error);
                });
            }
          </script>
        </body>
      </html>
    `);
  };

  return (
    <>
      <div className="News">
        <h3>News</h3>
        {isVisible && <div><button className="AddNewsButton" onClick={openFormInNewWindow}>Add News</button></div>}
      </div>
      <div className="news-container">
        {news.map((item) => (
          <div key={item.newsID} className="news-tile">
            <img src={item.newsCoverImage} alt={item.newsTitle} />
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
};

export { fetchNews };
export default News;
