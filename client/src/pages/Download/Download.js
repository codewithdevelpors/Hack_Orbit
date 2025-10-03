import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { downloadFile, getFileDetails } from "../../utils/api";

function Download() {
  const { id } = useParams();
  const [countdown, setCountdown] = useState(10);
  const [fileDetails, setFileDetails] = useState(null);

  const handleAutoDownload = useCallback(async () => {
    try {
      const downloadData = await downloadFile(id);
      if (downloadData.fileUrl) {
        // Create a temporary link to trigger download
        const link = document.createElement('a');
        link.href = downloadData.fileUrl;
        link.download = 'img'; // File name as 'img'
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Download failed:", error);
    }
  }, [id]);

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        const details = await getFileDetails(id);
        setFileDetails(details);
      } catch (error) {
        console.error("Failed to fetch file details:", error);
      }
    };
    fetchFileDetails();
  }, [id]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleAutoDownload();
    }
  }, [countdown, handleAutoDownload]);

  return (
    <div className="container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="card" style={{ textAlign: "center", padding: "3rem", maxWidth: "500px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "2rem", fontSize: "2.5rem" }}>Download Starting</h1>

        <div style={{ marginBottom: "2rem" }}>
          {fileDetails && (
            <div style={{ marginBottom: "2rem", textAlign: "center" }}>
              <img
                src={fileDetails.imgUrl}
                alt={fileDetails.fileName}
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-md)",
                  marginBottom: "1rem"
                }}
              />
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>File: {fileDetails.fileName}</h2>
            </div>
          )}

          {countdown > 0 ? (
            <div>
              <div className="progress-bar" style={{ marginBottom: "1rem" }}>
                <div
                  className="progress-fill"
                  style={{ width: `${(countdown / 10) * 100}%` }}
                ></div>
              </div>
              <div style={{ fontSize: "4rem", fontWeight: "bold", color: "var(--primary-color)", marginBottom: "1rem" }}>
                {countdown}
              </div>
              <p className="text-muted">Download will start automatically...</p>
            </div>
          ) : (
            <div>
              <div className="spinner" style={{ margin: "0 auto 1rem" }}></div>
              <p className="text-muted">Downloading...</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: "2rem" }}>
          <p className="text-sm text-muted">
            Your download should start shortly. If it doesn't, please check your browser settings.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Download;