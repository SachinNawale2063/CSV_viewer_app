
import React, { useState } from 'react';
import Upload from './components/Upload';
import DataTable from './components/DataTable';
import SummaryStats from './components/SummaryStats';
import './App.css';

function App() {
  const [fileData, setFileData] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); e

  const handleFileUpload = (data) => {
    setFileData(data);
    setShowSummary(false);      
    setCurrentPage(1);          
  };

  return (
    <div className="app-container">
      <h1 className="title">📊 CSV Summary Viewer</h1>
      <Upload onUpload={handleFileUpload} />
      {fileData && (
        <div className="result-container">
          <div className="info-box">
            <p><strong>Filename:</strong> {fileData.filename}</p>
            <p><strong>Upload Time:</strong> {fileData.upload_time}</p>
          </div>
          <DataTable
            data={fileData.data}
            columns={fileData.columns}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <button className="summary-toggle" onClick={() => setShowSummary(!showSummary)}>
            {showSummary ? 'Hide Summary' : 'View Summary'}
          </button>
          {showSummary && <SummaryStats summary={fileData.summary} />}
        </div>
      )}
    </div>
  );
}

export default App;
