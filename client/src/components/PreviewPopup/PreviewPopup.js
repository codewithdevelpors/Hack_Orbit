import React, { useEffect, useState } from "react";
import { getFileDetails } from "../../utils/api";
import Ads from "../Ads/Ads";
import "./PreviewPopup.css";

function PreviewPopup({ fileId, onClose }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const file = await getFileDetails(fileId);
        const response = await fetch(file.rawFileLink);
        if (!response.ok) throw new Error('Failed to fetch file');
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (fileId) fetchContent();
  }, [fileId]);

  return (
    <>
      <div className="preview-popup-overlay" onClick={onClose}>
        <div className="preview-popup" onClick={(e) => e.stopPropagation()}>
          <div className="preview-header">
            <h1>Code Preview</h1>
            <button className="preview-close-btn" onClick={onClose}>×</button>
          </div>
          {loading && <div className="spinner"></div>}
          {error && <div className="error-message">{error}</div>}
          {!loading && !error && (
            <pre className="preview-code">
              {content}
            </pre>
          )}
        </div>
      </div>
      <Ads type="popup" onClose={() => {}} />
    </>
  );
}

export default PreviewPopup;