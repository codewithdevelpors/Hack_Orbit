// Import React hooks for component state and lifecycle management
import React, { useEffect, useState, useCallback } from "react";
// Import hook to access URL parameters from React Router
import { useParams } from "react-router-dom";
// Import API functions for downloading files and fetching file details
import { downloadFile, getFileDetails } from "../../utils/api";
// Import the Ads component to display advertisements
import Ads from "../../components/Ads/Ads";
// Import the CSS styles for this component
import "./Download.css";

// Main Download component function
function Download() {
  // Extract the file ID from URL parameters using useParams hook
  const { id } = useParams();
  
  // State to store file details (name, image URL, etc.)
  const [fileDetails, setFileDetails] = useState(null);

  // Callback function to handle automatic download
  const handleAutoDownload = useCallback(async (details) => {
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
        link.download = details.fileName || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the object URL
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      // Log any download errors to the console
      console.error("Download failed:", error);
    }
  }, [id]); // Dependency array includes 'id' to recreate callback when ID changes

  // useEffect hook to fetch file details when component mounts or ID changes
  useEffect(() => {
    // Async function to fetch file details from API
    const fetchFileDetails = async () => {
      try {
        // Call API to get file details using the file ID
        const details = await getFileDetails(id);
        // Update state with the retrieved file details
        setFileDetails(details);
        // Immediately trigger the download
        handleAutoDownload(details);
      } catch (error) {
        // Log any errors that occur during file details fetching
        console.error("Failed to fetch file details:", error);
      }
    };

    // Execute the fetch function
    fetchFileDetails();
  }, [id, handleAutoDownload]); // Re-run effect when 'id' or 'handleAutoDownload' changes

  // JSX return statement - renders the component UI
  return (
    // Main container div with CSS class for centering and full height
    <div className="download-container">
      
      
      {/* Main card container for download content */}
      <div className="download-card">
        {/* Main heading for the download page */}
        <h1 className="download-heading">Download Starting</h1>

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

          {/* Show loading interface since download starts immediately */}
          {fileDetails && (
            <div>
              {/* Loading spinner element */}
              <div className="spinner loading-spinner"></div>
              {/* Loading status text */}
              <p className="text-muted">Downloading...</p>
            </div>
          )}
        </div>

        {/* Bottom information section */}
        <div className="download-info">
          {/* Helpful information text for users */}
          <p className="text-sm text-muted">
            Your download should start shortly. If it doesn't, please check your browser settings.
          </p>
        </div>
      </div>
    </div>
  );
}

// Export the Download component as default export
export default Download;