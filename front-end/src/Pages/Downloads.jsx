import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fileDownload from '../assets/download.png';
import fileDownload1 from '../assets/download2.png';
import { loggedInUser } from '../Pages/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload ,faTrash } from '@fortawesome/free-solid-svg-icons';


const FileUploadDownload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [visibleToAll, setVisibleToAll] = useState(false);
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

  const handleUpload = async () => {
    if (!selectedFile || !displayName) {
      alert('Please select a file and enter a display name!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('displayName', displayName);
    formData.append('visibleToAll', visibleToAll);

    try {
      const response = await axios.post('http://localhost:8080/api/v1/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('File uploaded successfully');
        setSelectedFile(null);
        setDisplayName('');
        setVisibleToAll(false);
        setShowUploadForm(false);
        fetchUploadedFiles();
      } else {
        alert('Failed to upload file');
      }
    } catch (error) {
      console.error('There was an error uploading the file!', error);
      // setErrorMessage('File upload failed. Please try again.');
      alert('File upload failed. Please try again.');
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

  return (
    <div>
      <div className="downloadTitle">
        <h3>Downloads</h3>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="http://localhost:5173/"> 
                <span style={{ fontSize: 16}}>Home</span>
              </a>
            </li>
            <li className="breadcrumb-item active">
              <span style={{ fontSize: 16}}> Downloads</span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="downloadLinks">
        <nav>
          <h4>Downloads For Students and PGIS Staff</h4>
          <img src={fileDownload1} alt="fileDownload1" />
          <a className="openlink" href="http://www.pgis.pdn.ac.lk/downloads/students.php">
            <p>PGIS Downloads page for Students</p>
          </a>
          <a className="openlink" href="http://www.pgis.pdn.ac.lk/downloads/staff.php">
            <p>PGIS Downloads page for Staff</p>
          </a>
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
              <label>
                <input
                  type="checkbox"
                  checked={visibleToAll}
                  onChange={handleVisibilityChange}
                /> Set Visible to All </label>
              <button onClick={handleUpload}>Upload File</button>
            </div>
          )}
        </div>
      )}

      {errorMessage && <p className="error">{errorMessage}</p>}

      <div className="downloadSection">
        {uploadedFiles.map((file) => (
          (file.visibleToAll || loggedInUser.isLoggedIn) && (
            <div key={file.fileId} className="fileItem">
              <img src={fileDownload} alt="fileDownload" />
              <span><p>{file.displayName}</p></span>
              
              <button onClick={() => handleDownload(file.fileId, file.fileName)}><FontAwesomeIcon icon={faDownload} /></button>
              {loggedInUser.isLoggedIn && (
                <button onClick={() => handleDelete(file.fileId)}><FontAwesomeIcon icon={faTrash}/></button>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default FileUploadDownload;
