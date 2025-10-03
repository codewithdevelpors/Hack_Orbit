import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Details.css";
import { getFileDetails } from "../../utils/api";

function Details() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchFile = async () => {
      const data = await getFileDetails(id);
      setFile(data);
    };
    fetchFile();
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }
    return stars;
  };

  if (!file) return <div className="loading">Loading...</div>;

  return (
    <div className="details-page">
      <div className="details-container">
        <div className="details-content">
          <div className="file-image">
            <img src={file.imgUrl} alt={file.fileName} />
          </div>
          <div className="file-info">
            <h1 className="file-title">{file.fileName}</h1>
            <div className="file-meta">
              <span className="file-type">Type: {file.type}</span>
              <span className="file-category">Category: {file.category}</span>
              <span className="file-date">Created: {new Date(file.createdDate).toLocaleDateString()}</span>
            </div>
            <div className="rating">
              <div className="stars">{renderStars(file.rating)}</div>
              <span className="rating-text">({file.rating} / 5 from {file.ratingsCount} reviews)</span>
            </div>
            <p className="file-description">{file.pageDescription}</p>
            <div className="action-buttons">
              <button className="btn btn-preview" onClick={() => setShowPreview(true)}>Preview</button>
              <Link to={`/download/${file._id}`}>
                <button className="btn btn-download">Download</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showPreview && (
        <div className="preview-modal-overlay" onClick={() => setShowPreview(false)}>
          <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="preview-modal-header">
              <h2>Preview: {file.fileName}</h2>
              <button className="preview-close-btn" onClick={() => setShowPreview(false)}>×</button>
            </div>
            <div className="preview-modal-content">
              <pre>{file.pageDescription}</pre>
            </div>
            <div className="preview-modal-actions">
              <button onClick={() => navigator.clipboard.writeText(file.pageDescription)}>Copy</button>
              <button onClick={() => setShowPreview(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
