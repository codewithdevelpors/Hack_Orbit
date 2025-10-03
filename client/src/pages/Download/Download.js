import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Download.css";
import { downloadFile } from "../../utils/api";

function Download() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [countdown, setCountdown] = useState(10);
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    const fetchFile = async () => {
      const data = await downloadFile(id);
      setFile(data);
    };
    fetchFile();
  }, [id]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (file?.fileUrl && !downloadStarted) {
      setDownloadStarted(true);
      window.location.href = file.fileUrl;
    }
  }, [countdown, file, downloadStarted]);

  const progressPercentage = ((10 - countdown) / 10) * 100;

  if (!file) {
    return (
      <div className="download-page">
        <div className="download-loading">
          <div className="loading-spinner"></div>
          <p>Loading download page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="download-page">
      <div className="download-hero">
        <div className="download-container">
          <div className="download-header">
            <h1 className="download-title">🚀 Download Center</h1>
            <p className="download-subtitle">Your file is ready for download</p>
          </div>

          <div className="download-card">
            <div className="file-preview">
              <img src={file.imgUrl} alt={file.fileName} className="file-image" />
              <div className="file-overlay">
                <div className="file-icon">📁</div>
              </div>
            </div>

            <div className="file-info">
              <h2 className="file-name">{file.fileName}</h2>
              <div className="file-details">
                <span className="file-type">Type: {file.type}</span>
                <span className="file-category">Category: {file.category}</span>
                <span className="file-rating">⭐ {file.rating}/5</span>
              </div>
              <p className="file-description">{file.shortDescription || file.pageDescription?.substring(0, 150) + '...'}</p>
            </div>

            {!downloadStarted ? (
              <div className="download-progress">
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    <span className="countdown-number">{countdown}</span>
                    <span className="countdown-label">seconds</span>
                  </div>
                </div>
                <p className="progress-message">Preparing your download...</p>
              </div>
            ) : (
              <div className="download-success">
                <div className="success-icon">✅</div>
                <h3>Download Started!</h3>
                <p>If the download didn't start automatically, <a href={file.fileUrl} className="manual-download-link">click here</a></p>
                <div className="success-actions">
                  <button
                    className="back-btn"
                    onClick={() => window.history.back()}
                  >
                    ← Back to Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Download;
