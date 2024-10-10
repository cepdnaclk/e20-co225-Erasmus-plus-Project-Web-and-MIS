import React, { useEffect, useState } from "react";
import axios from "axios";
import { loggedInUser } from '../components/Header'; // Import logged-in user details
import '../components/News.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesome for icons
import { faPen, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons

//

var today = new Date().toISOString().split('T')[0]
// Function to fetch news from the API, sorted by newsID in descending order
const fetchNews = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/news'); // Fetch news from backend
    return response.data.sort((a, b) => b.newsID - a.newsID); // Sort news by most recent (highest ID first)
  } catch (error) {
    console.error('Error fetching news:', error); 
    return []; // Return empty array if there's an error
  }
};

const News = () => {
  const [news, setNews] = useState([]); // State to hold the list of news
  const [showForm, setShowForm] = useState(false); // State to toggle add news form visibility
  const [file, setFile] = useState(null); // State to hold the selected image file

  // useEffect to fetch news when the component mounts
  useEffect(() => {
    const getNews = async () => {
      const latestNews = await fetchNews(); // Fetch latest news
      setNews(latestNews); // Set the fetched news in the state
    };

    getNews(); // Call the function to fetch news
  }, []); // Empty dependency array means this runs only on the initial render

  // Function to toggle the visibility of the add news form
  const toggleForm = () => {
    setShowForm(!showForm); // Toggle the showForm state between true and false
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set the selected file in state
  };

  // Function to handle the form submission for adding news
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const form = event.target;

    // Create FormData to send the image file and other data
    const formData = new FormData();
    formData.append('newsTitle', form.newsTitle.value);
    formData.append('newsDescription', form.newsDescription.value);
    formData.append('newsUrl', form.newsUrl.value);
    formData.append('newsAuthor', form.newsAuthor.value);
    formData.append('newsDate', form.newsDate.value);
    formData.append('newsCoverImage', file); // Append the image file

    // Send POST request to backend to add news
    try {
      const response = await axios.post('http://localhost:8080/api/v1/news', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toggleForm(); // Close the form after successful submission
      const latestNews = await fetchNews(); // Fetch the latest news
      setNews(latestNews); // Update the news list with the new entry
    } catch (error) {
      console.error('Error adding news:', error); // Log any errors
    }
  };

  // Function to handle news deletion
  const onDeleteClick = async (newsID) => {
    console.log("Delete button clicked");
    console.log(newsID); // Log the newsID for debugging
    try {
      await axios.delete(`http://localhost:8080/api/v1/news/${newsID}`); // Send DELETE request
      
      // Fetch the updated list of news and update the state
      const latestNews = await fetchNews();
      setNews(latestNews);
    } catch (error) {
      console.error("Error deleting news:", error); // Log any errors
    }
  }
  

  return (
    <>
      <div className="pageTitle">
        <h3>News</h3>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="http://localhost:5173/"> 
                <span style={{ fontSize: 16}}>Home</span>
              </a>
            </li>
            <li className="breadcrumb-item active">
              <span style={{ fontSize: 16}}> News & Events</span>
            </li>
            <li className="breadcrumb-item active">
              <span style={{ fontSize: 16}}> News</span>
            </li>
          </ol>
        </nav>
      </div>
      <div className="NewsAdd">
        {/* Show Add News button only if the user is logged in */}
        {loggedInUser.isLoggedIn && (
          <div>
            <button className="addNewButton" onClick={toggleForm}>
              {showForm ? 'Close Form' : 'Add News'} {/* Toggle between Add and Close */}
            </button>
          </div>
        )}
        
        {/* Conditional rendering of the add news form */}
        {showForm && (
          <div className="add-news-form-container">
            <div className="add-news-form">
              <h2>Add News</h2>
              <form onSubmit={handleSubmit}>
                {/* Form fields to add new news */}
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
                {}
                <div className="form-group">
                  <label htmlFor="newsDate">Date:</label>
                  <input type="date" max={today} id="newsDate" name="newsDate" required />
                </div>
                <div className="form-group">
                  <label htmlFor="newsCoverImage">Cover Image (Choose images with size less than 64 kB):</label>
                  <input type="file" id="newsCoverImage" name="newsCoverImage" onChange={handleFileChange} required />
                </div>
                <div className="form-buttons">
                  <button type="submit">Add News</button> {/* Submit button */}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      
      {/* Display news items */}
      <div className="news-container">
        {news.map((item) => (
          <div key={item.newsID} className="news-tile">
            <img src={`data:image/jpeg;base64,${item.newsCoverImage}`} alt={item.newsTitle} />
            <h2>{item.newsTitle}</h2> {/* News title */}
            <p>{item.newsDescription}</p> {/* News description */}
            <b><p>Date: {item.newsDate}</p></b> {/* News date */}
            <b><p>Author: {item.newsAuthor}</p></b> {/* News author */}
            <a href={item.newsUrl} target="_blank" rel="noopener noreferrer">Read more</a> {/* Link to full news */}
            
            {/* Show edit and delete buttons only if user is logged in */}
            {loggedInUser.isLoggedIn && (
              <div className="news-actions">
                <button className="actionButton" onClick={() => onDeleteClick(item.newsID)}><FontAwesomeIcon icon={faTrash} /></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export { fetchNews };
export default News;
