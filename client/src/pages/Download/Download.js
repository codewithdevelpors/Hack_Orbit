// Import React hooks for component state and lifecycle management
import React, { useEffect, useState, useCallback } from "react";
// Import hook to access URL parameters from React Router
import { useParams } from "react-router-dom";
// Import API functions for downloading files and fetching file details
import { downloadFile, getFileDetails } from "../../utils/api";
// Import the Ads component to display advertisements
import Ads from "../../components/Ads/Ads";
// Import Button component for download functionality
import Button from "../../ui/Button";
// Import the CSS styles for this component
import "./Download.css";

// Main Download component function
function Download() {
  // Extract the file ID from URL parameters using useParams hook
  const { id } = useParams();
  
  // State to store file details (name, image URL, etc.)
  const [fileDetails, setFileDetails] = useState(null);
  
  // State for countdown timer (15 seconds)
  const [countdown, setCountdown] = useState(15);
  
  // State to track if countdown is finished
  const [countdownFinished, setCountdownFinished] = useState(false);
  
  // State to track if download is in progress
  const [isDownloading, setIsDownloading] = useState(false);

  // Callback function to handle manual download
  const handleDownload = useCallback(async () => {
    if (!countdownFinished || isDownloading) return;
    
    setIsDownloading(true);
    try {
      // Call API to get download data for the file ID
      const downloadData = await downloadFile(id);

      // Check if the API returned a valid file URL
      if (downloadData.fileUrl) {
        // Fetch the file as blob to force download
        const response = await fetch(downloadData.fileUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Create a temporary anchor element for triggering download
        const link = document.createElement('a');
        link.href = url;
        link.download = fileDetails.fileName || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the object URL
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      // Log any download errors to the console
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  }, [id, fileDetails]); // Dependency array includes 'id' and 'fileDetails'

  // useEffect hook to fetch file details when component mounts or ID changes
  useEffect(() => {
    // Async function to fetch file details from API
    const fetchFileDetails = async () => {
      try {
        // Call API to get file details using the file ID
        const details = await getFileDetails(id);
        // Update state with the retrieved file details
        setFileDetails(details);
      } catch (error) {
        // Log any errors that occur during file details fetching
        console.error("Failed to fetch file details:", error);
      }
    };

    // Execute the fetch function
    fetchFileDetails();
  }, [id]); // Re-run effect when 'id' changes

  // useEffect hook for countdown timer
  useEffect(() => {
    if (!fileDetails || countdownFinished) return;

    // Create interval for countdown
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          setCountdownFinished(true);
          clearInterval(timer);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [fileDetails, countdownFinished]); // Re-run effect when fileDetails or countdownFinished changes

  // JSX return statement - renders the component UI
  return (
    // Main container div with CSS class for centering and full height
    <div className="download-container">
      
      
      {/* Main card container for download content */}
      <div className="download-card">
        {/* Main heading for the download page */}
        <h1 className="download-heading">
          {countdownFinished ? "Download Ready" : "Preparing Download"}
        </h1>

        {/* Container for file details and countdown/loading content */}
        <div className="file-details-container">
          {/* Conditional rendering: show file details only when data is available */}
          {fileDetails && (
            // File preview section container
            <div className="file-preview">
              {/* Display file preview image */}
              <img
                src={fileDetails.imgUrl}
                alt={fileDetails.fileName}
                className="file-preview-image"
              />
              {/* Display file name as heading */}
              <h2 className="file-name-heading">File: {fileDetails.fileName}</h2>
            </div>
          )}

          {/* Show countdown or download button based on countdown status */}
          {fileDetails && (
            <div className="download-action-container">
              {!countdownFinished ? (
                // Show countdown timer
                <div className="countdown-container">
                  <div className="countdown-display">{countdown}</div>
                  <p className="text-muted">
                    Download will be available in {countdown} second{countdown !== 1 ? 's' : ''}
                  </p>
                </div>
              ) : (
                // Show download button when countdown is finished
                <div className="download-button-container">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleDownload}
                    disabled={isDownloading}
                    loading={isDownloading}
                    className="download-button"
                  >
                    {isDownloading ? 'Downloading...' : 'Download Now'}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom information section */}
        <div className="download-info">
          {/* Helpful information text for users */}
          <p className="text-sm text-muted">
            {countdownFinished
              ? "Click the button above to start your download."
              : "Please wait for the countdown to finish before downloading."
            }
          </p>
        </div>
      </div>
    </div>
  );
}

// Export the Download component as default export
export default Download;