import React, { useEffect, useState } from "react";
import axios from "axios";
import { loggedInUser } from '../Pages/Login';
import '../components/News.css'; // Import your CSS file

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
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getNews = async () => {
      const latestNews = await fetchNews();
      setNews(latestNews);
    };

    getNews();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (event) => {
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
        toggleForm(); // Close the form after successful submission
        fetchNews().then(latestNews => setNews(latestNews)); // Refresh news list
      })
      .catch(error => {
        console.error('Error adding news:', error);
      });
  };

  return (
    <>
      <div className="News">
        <h3>News</h3>
        {loggedInUser.isLoggedIn && (
          <div>
            <button className="AddNewsButton" onClick={toggleForm}>
              {showForm ? 'Close Form' : 'Add News'}
            </button>
          </div>
        )}
        {showForm && (
          <div className="add-news-form-container">
          <div className="add-news-form">
            <h2>Add News</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="newsTitle">Title:</label>
                <input type="text" placeholder="Enter News Title" id="newsTitle" name="newsTitle" required />
              </div>
              <div className="form-group">
                <label htmlFor="newsDescription">Description:</label>
                <textarea id="newsDescription" placeholder="Enter News Description" name="newsDescription" required></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="newsUrl">URL:</label>
                <input type="url" id="newsUrl" placeholder="Enter News URL" name="newsUrl" required />
              </div>
              <div className="form-group">
                <label htmlFor="newsAuthor">Author:</label>
                <input type="text" id="newsAuthor" placeholder="Enter Author's name" name="newsAuthor" required />
              </div>
              <div className="form-group">
                <label htmlFor="newsDate">Date:</label>
                <input type="date" id="newsDate" name="newsDate" required />
              </div>
              <div className="form-group">
                <label htmlFor="newsCoverImage">Cover Image URL:</label>
                <input type="url" id="newsCoverImage" placeholder="Enter Image URL" name="newsCoverImage" required />
              </div>
              <div className="form-buttons">
                <button type="submit">Add News</button>
              </div>
            </form>
          </div>
        </div>)}
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
