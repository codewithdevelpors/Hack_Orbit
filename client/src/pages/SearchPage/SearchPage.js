import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SearchPage.css";
import { searchFiles } from "../../utils/api";

function SearchPage() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const query = new URLSearchParams(useLocation().search).get("query");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await searchFiles(query);
        setResults(data);
      } catch {
        setError("No data found in database.");
      }
    };
    if (query) fetchResults();
  }, [query]);

  return (
    <div className="search-page">
      <h1>Search Results for: {query}</h1>
      {error && <p>{error}</p>}
      <div className="results">
        {results.map((file) => (
          <div key={file._id} className="result">
            <h3>{file.fileName}</h3>
            <p>{file.shortDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
