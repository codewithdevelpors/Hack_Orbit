import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SearchPage.css";
import { searchFiles } from "../../utils/api";

function SearchPage() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await searchFiles({ query, category, type });
        setResults(data);
        setError("");
      } catch {
        setError("No data found in database.");
      }
    };
    
    // Fetch results if any search parameter is provided
    if (query || category || type) {
      fetchResults();
    }
  }, [query, category, type]);

  // Generate title based on search parameters
  const getSearchTitle = () => {
    if (query) return `Search Results for: "${query}"`;
    if (category && type) return `${category.charAt(0).toUpperCase() + category.slice(1)} ${type.toUpperCase()} Programs`;
    if (category) return `${category.charAt(0).toUpperCase() + category.slice(1)} Programs`;
    if (type) return `${type.toUpperCase()} Programs`;
    return "Search Results";
  };

  return (
    <div className="search-page">
      <h1>{getSearchTitle()}</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="results">
        {results.map((file) => (
          <div key={file._id} className="result">
            <h3>{file.fileName}</h3>
            <p>{file.shortDescription}</p>
            <div className="file-meta">
              <span className="file-type">{file.type}</span>
              <span className="file-category">{file.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
