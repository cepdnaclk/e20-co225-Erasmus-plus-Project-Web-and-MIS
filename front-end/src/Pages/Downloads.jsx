import React, { useState } from "react";
import fileDownload from '../assets/download.png';

function Downloads() {

  // Downloading files
  const handleDownload = async (fileName) => {
    try {
      const response = await fetch(`/pdf/${fileName}`);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("There was an error downloading the file!", error);
    }
  };

  return (
    <>
      <div className="downloadTitle">
        <h3>Downloads</h3>
      </div>


      <div className="downloadPage">

        <div className="downloadButton">  
          <h4>Project Card</h4>
          <img src={fileDownload} alt="fileDownload"/>
          <button className="downloadButton" onClick={() => handleDownload('Project-101128627.pdf')}>Download</button> 
        </div>

        <div className="downloadButton">
          <h4>Application Form</h4>
          <img src={fileDownload} alt="fileDownload"/>
          <a className="openlink" href="http://www.pgis.pdn.ac.lk/downloads/students.php"><p>Open</p></a>
        </div>

        <div className="downloadButton">
          <h4>Handbook</h4>
          <img src={fileDownload} alt="fileDownload"/>
          <button className="downloadButton" onClick={() => handleDownload('Handbook.pdf')}>Download</button>
        </div>

        <div className="downloadButton">
          <nav>
          <h4>For PGIS Staff</h4>
          <img src={fileDownload} alt="fileDownload"/>
          <a className="openlink" href="http://www.pgis.pdn.ac.lk/downloads/staff.php"><p>Open</p></a>
          </nav>
        </div>

      </div>
    </>
  );
}

export default Downloads;
