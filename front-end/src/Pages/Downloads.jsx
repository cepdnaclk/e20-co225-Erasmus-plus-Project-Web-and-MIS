import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fileDownload from '../assets/download.png';
import { loggedInUser } from '../Pages/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload ,faTrash, faEye } from '@fortawesome/free-solid-svg-icons';


const FileUploadDownload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [visibleToAll, setVisibleToAll] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/files');
      setUploadedFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handleVisibilityChange = (event) => {
    setVisibleToAll(event.target.checked);
  };

  const handleYoutubeLinkChange = (event) => {
    setYoutubeLink(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile && !youtubeLink) {
      alert('Please select a file or enter a URL for the file!');
      return;
    }

    if (selectedFile && !displayName) {
      alert('Please enter a display name!');
      return;
    }

    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);
      formData.append('displayName', displayName);
      formData.append('visibleToAll', visibleToAll);
    } else if (youtubeLink) {
      formData.append('youtubeLink', youtubeLink);
      formData.append('displayName', displayName);
      formData.append('visibleToAll', visibleToAll);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Content uploaded successfully');
        setSelectedFile(null);
        setYoutubeLink('');
        setDisplayName('');
        setVisibleToAll(false);
        setShowUploadForm(false);
        fetchUploadedFiles();
      } else {
        alert('Failed to upload content');
      }
    } catch (error) {
      console.error('There was an error uploading the content!', error);
      alert('Upload failed. Please try again.');
    }
  };

  const handleDownload = async (fileId, fileName) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/files/${fileId}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('There was an error downloading the file!', error);
      setErrorMessage('File download failed. Please try again.');
    }
  };

  const handleDelete = async (fileId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this file?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/files/${fileId}`);
      if (response.status === 200) {
        alert('File deleted successfully');
        fetchUploadedFiles();
      } else {
        alert('Failed to delete file');
      }
    } catch (error) {
      console.error('There was an error deleting the file!', error);
      setErrorMessage('File deletion failed. Please try again.');
    }
  };

  // Filter files into two groups: visible to all and visible to logged-in users only
  const visibleToAllFiles = uploadedFiles.filter(file => file.visibleToAll);
  const visibleToLoggedInFiles = uploadedFiles.filter(file => !file.visibleToAll && loggedInUser.isLoggedIn);

  return (
    <div>
      <div className="downloadTitle">
        <h3>Downloads</h3>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="http://localhost:5173/">
                <span style={{ fontSize: 16 }}>Home</span>
              </a>
            </li>
            <li className="breadcrumb-item active">
              <span style={{ fontSize: 16 }}>Downloads</span>
            </li>
          </ol>
        </nav>
      </div>

      {loggedInUser.isLoggedIn && (
        <div className="upload-section">
          <button className="addcancelbutton" onClick={() => setShowUploadForm(!showUploadForm)}>
            {showUploadForm ? 'Cancel' : 'Add File'}
          </button>
          {showUploadForm && (
            <div className="upload-form">
              <h4>Add a New File</h4>
              <input type="file" onChange={handleFileChange} />
              <input
                type="text"
                placeholder="Enter a Display Name"
                value={displayName}
                onChange={handleDisplayNameChange}
              />
              <input
                type="url"
                placeholder="Enter the URL"
                value={youtubeLink}
                onChange={handleYoutubeLinkChange}
              />
              <label>
                <input
                  type="checkbox"
                  checked={visibleToAll}
                  onChange={handleVisibilityChange}
                /> Set Visible to Public
              </label>
              <button onClick={handleUpload}>Upload Content</button>
            </div>
          )}
        </div>
      )}

      {errorMessage && <p className="error">{errorMessage}</p>}

      <div className="downloadSection">
  {/* <h4>Download Files here</h4> */}
  {visibleToAllFiles.length > 0 ? (
    visibleToAllFiles.map(file => (
      <div key={file.fileId} className="fileItem">
        {file.youtubeLink ? (
          <div className="fileContent">
            <p>{file.displayName}</p>
            <div className="fileActions">
              <a href={file.youtubeLink} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faEye}/>
              </a>
              {loggedInUser.isLoggedIn && (
                <button onClick={() => handleDelete(file.fileId)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="fileContent">
            <img src={fileDownload} alt="fileDownload" />
            <span><p>{file.displayName}</p></span>
            <div className="fileActions">
              <button onClick={() => handleDownload(file.fileId, file.fileName)}>
                <FontAwesomeIcon icon={faDownload} />
              </button>
              {loggedInUser.isLoggedIn && (
                <button onClick={() => handleDelete(file.fileId)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    ))
  ) : (
    <p>No files visible to Public</p>
  )}

  {loggedInUser.isLoggedIn && (
    <>
      <h4>Files Only for the CYCLE Team</h4>
      {visibleToLoggedInFiles.length > 0 ? (
        visibleToLoggedInFiles.map(file => (
          <div key={file.fileId} className="fileItem">
            {file.youtubeLink ? (
              <div className="fileContent">
                <p>{file.displayName}</p>
                <div className="fileActions">
                  <a href={file.youtubeLink} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faEye}/>
                  </a>
                  <button onClick={() => handleDelete(file.fileId)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="fileContent">
                <img src={fileDownload} alt="fileDownload" />
                <span><p>{file.displayName}</p></span>
                <div className="fileActions">
                  <button onClick={() => handleDownload(file.fileId, file.fileName)}>
                    <FontAwesomeIcon icon={faDownload} />
                  </button>
                  <button onClick={() => handleDelete(file.fileId)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No files visible to logged-in users</p>
      )}
    </>
  )}
</div>

    </div>
  );
};

export default FileUploadDownload;
