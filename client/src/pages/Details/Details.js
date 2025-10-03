import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFileDetails, downloadFile } from "../../utils/api";
import { FILE_TYPES, CATEGORIES } from "../../constants";

function Details() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewType, setPreviewType] = useState("");

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

  const handlePreview = (type) => {
    setPreviewType(type);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setPreviewType("");
  };

  const handleDownload = async () => {
    try {
      const downloadData = await downloadFile(file._id);
      if (downloadData.fileUrl) {
        window.open(downloadData.fileUrl, "_blank");
      }
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback to opening image URL
      window.open(file.imgUrl, "_blank");
    }
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
    <div className="container" style={{ padding: "2rem 0", minHeight: "100vh" }}>
      <div className="card" style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
        {/* File Image */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <img
            src={file.imgUrl}
            alt={file.fileName}
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "1rem",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
            }}
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
            }}
          />
        </div>

        {/* File Info */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ marginBottom: "1rem", fontSize: "2.5rem" }}>{file.fileName}</h1>

          {/* Meta Info */}
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span className="text-sm bg-secondary text-secondary" style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem" }}>
              {FILE_TYPES[file.type] || file.type}
            </span>
            <span className={`text-sm ${file.category === 'free' ? 'bg-success text-light' : 'bg-warning text-dark'}`}
                  style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem" }}>
              {CATEGORIES[file.category]}
            </span>
          </div>

          {/* Rating */}
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
              {renderStars(file.rating || 4.2)}
            </div>
            <p className="text-muted">{file.rating || 4.2} out of 5 stars</p>
          </div>

          {/* Date */}
          <p className="text-muted" style={{ marginBottom: "2rem" }}>
            Created: {new Date(file.createdDate).toLocaleDateString()}
          </p>

          {/* Description */}
          <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
            {file.pageDescription || file.shortDescription}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          {isHtmlCss && (
            <>
              <button className="btn btn-primary" onClick={() => handlePreview("html")}>
                Preview HTML
              </button>
              <button className="btn btn-primary" onClick={() => handlePreview("css")}>
                Preview CSS
              </button>
            </>
          )}
          {!isHtmlCss && (
            <button className="btn btn-primary" onClick={() => handlePreview("code")}>
              Preview Code
            </button>
          )}
          <button className="btn btn-secondary" onClick={handleDownload}>
            Download
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "white",
            borderRadius: "1rem",
            maxWidth: "90vw",
            maxHeight: "90vh",
            width: "800px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1.5rem",
              borderBottom: "1px solid #eee"
            }}>
              <h2 style={{ margin: 0 }}>
                {previewType === "html" ? "HTML Preview" : previewType === "css" ? "CSS Preview" : "Code Preview"}
              </h2>
              <button
                onClick={closePreview}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "2rem",
                  cursor: "pointer",
                  color: "#666",
                  padding: "0",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                ×
              </button>
            </div>
            <div style={{
              padding: "1.5rem",
              flex: 1,
              overflowY: "auto",
              maxHeight: "60vh"
            }}>
              <pre style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                fontFamily: "'Courier New', monospace",
                fontSize: "0.9rem",
                lineHeight: "1.5",
                color: "#333",
                margin: 0
              }}>
                {previewType === "html" ? `<!-- Sample HTML for ${file.fileName} -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${file.fileName}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Welcome to ${file.fileName}</h1>
    <p>This is a sample HTML structure.</p>
</body>
</html>` :
                 previewType === "css" ? `/* Sample CSS for ${file.fileName} */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

h1 {
    color: #333;
    text-align: center;
}

p {
    line-height: 1.6;
    color: #666;
}` :
                 `// Sample code for ${file.fileName}
// This is placeholder code content
function exampleFunction() {
    console.log("Hello from ${file.fileName}!");
    return "Sample output";
}

// Usage
const result = exampleFunction();
console.log(result);`}
              </pre>
            </div>
            <div style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "flex-end",
              padding: "1.5rem",
              borderTop: "1px solid #eee"
            }}>
              <button className="btn btn-secondary" onClick={closePreview}>
                Close
              </button>
              <button className="btn btn-primary" onClick={handleDownload}>
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;