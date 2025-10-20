import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFileDetails } from "../../utils/api";
import { FILE_TYPES, CATEGORIES } from "../../constants";
import PreviewPopup from "../../components/PreviewPopup/PreviewPopup";
import "./Details.css";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        setLoading(true);
        const data = await getFileDetails(id);
        setFile(data);
        setError("");
      } catch (err) {
        setError("Failed to load file details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFileDetails();
    }
  }, [id]);


  const handleDownload = () => {
    navigate(`/download/${file._id}`);
  };

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
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !file) {
    return (
      <div className="container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          <h2>{error || "File not found"}</h2>
          <p>Please check the URL and try again.</p>
        </div>
      </div>
    );
  }

  const isHtmlCss = file.type === "html";

  return (
    <div className="details-container">
      {/* Row 1: Image and Description Side by Side */}
      <div className="details-row">
        <div className="details-content-row">
          {/* Image on the left */}
          <div className="details-image-container">
            <img
              src={file.imgUrl}
              alt={file.fileName}
              className="details-image"
              onError={(e) => {
                e.target.src = "/placeholder-image.jpg";
              }}
            />
          </div>

          {/* Description on the right */}
          <div className="details-description-container">
            {/* Name and Type above rating */}
            <div className="details-header-info">
              <h2>{file.fileName}</h2>
              <div className="details-meta">
                <span className="text-sm bg-secondary text-secondary" style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem" }}>
                  {FILE_TYPES[file.type] || file.type}
                </span>
                <span className={`text-sm ${file.category === 'free' ? 'bg-success text-light' : 'bg-warning text-dark'}`}
                      style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem" }}>
                  {CATEGORIES[file.category]}
                </span>
              </div>
            </div>

            {/* Rating */}
            <div className="details-rating">
              <div className="details-rating-stars">
                {renderStars(file.rating || 4.2)}
              </div>
              <p className="text-muted">{file.rating || 4.2} out of 5 stars</p>
            </div>

            {/* Date */}
            <p className="text-muted" style={{ marginBottom: "1rem" }}>
              <strong>Created Date:</strong> {new Date(file.createdDate).toLocaleDateString()}
            </p>

            {/* Category */}
            <p className="text-muted" style={{ marginBottom: "1rem" }}>
              <strong>Category:</strong> {CATEGORIES[file.category]}
            </p>

            {/* File Type */}
            <p className="text-muted" style={{ marginBottom: "1rem" }}>
              <strong>File Type:</strong> {FILE_TYPES[file.type] || file.type}
            </p>

            {/* Price */}
            <p className="text-muted" style={{ marginBottom: "1rem" }}>
              <strong>Price:</strong> {file.price === 0 ? 'Free' : `$${file.price}`}
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: Short Description and Page Description Full Width */}
      <div className="details-row">
        <div className="details-descriptions-full">
          {/* Short Description */}
          <p className="details-shortDescription" style={{ marginBottom: "1rem" }}>
            <strong>Short Description:</strong> {file.shortDescription}
          </p>

          {/* Full Description */}
          <div className="details-description">
            <strong>Description:</strong>
            <p style={{ marginTop: "0.5rem", lineHeight: "1.6" }}>
              {file.pageDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Row 3: Action Buttons */}
      <div className="details-row">
        <div className="details-actions">
          {isHtmlCss && (
            <>
              <button className="btn btn-primary" onClick={() => setShowPreview(true)}>
                Preview HTML
              </button>
              <button className="btn btn-primary" onClick={() => setShowPreview(true)}>
                Preview CSS
              </button>
              <button className="btn btn-primary" onClick={() => setShowPreview(true)}>
                Preview JS
              </button>
            </>
          )}
          {!isHtmlCss && (
            <button className="btn btn-primary" onClick={() => setShowPreview(true)}>
              Preview Code
            </button>
          )}
          <button className="btn btn-secondary" onClick={handleDownload}>
            Download
          </button>
        </div>
      </div>

      {showPreview && (
        <PreviewPopup fileId={file._id} onClose={() => setShowPreview(false)} />
      )}
    </div>
  );
}

export default Details;