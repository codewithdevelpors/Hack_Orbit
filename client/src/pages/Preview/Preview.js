import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFileDetails } from "../../utils/api";
import "./Preview.css";

function Preview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const file = await getFileDetails(id);
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

    if (id) fetchContent();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          <h2>{error}</h2>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "2rem 0", minHeight: "100vh" }}>
      <div className="preview-card">
        <div className="preview-header">
          <h1>Code Preview</h1>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
        </div>
        <pre className="preview-code">
          {content}
        </pre>
      </div>
    </div>
  );
}

export default Preview;