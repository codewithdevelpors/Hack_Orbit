import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchPage.css";
import { searchFiles } from "../../utils/api";
import { Card, CardContent, CardImage } from "../../ui/Card";
import Button from "../../ui/Button";
import Ads from "../../components/Ads/Ads";
import { FILE_TYPES, CATEGORIES } from "../../constants";

const insertAds = (items, adComponent) => {
  const result = [];
  items.forEach((item, index) => {
    result.push(item);
    if ((index + 1) % 4 === 0) {
      result.push(adComponent);
    }
  });
  return result;
};

function SearchPage() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
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
      <div className="container">
        <h1 className="search-title">{getSearchTitle()}</h1>
        {error && <p className="error-message">{error}</p>}
        {results.length > 0 ? (
          <div className="files-grid">
            {insertAds(
              results.map((file) => (
                <Card
                  key={file._id}
                  className="file-card"
                  rating={file.rating || 4.2}
                  showTrending={true}
                  trendingThreshold={4.5}
                >
                  <CardImage src={file.imgUrl} alt={file.fileName} />
                  <CardContent>
                    <div className="file-info">
                      <h3 className="file-title">{file.fileName}</h3>
                      <div className="file-meta">
                        <span className="file-type">{FILE_TYPES[file.type] || file.type}</span>
                        <span className={`file-category ${file.category}`}>
                          {CATEGORIES[file.category]}
                        </span>
                      </div>
                      <p className="file-date">
                        Created: {new Date(file.createdDate).toLocaleDateString()}
                      </p>
                      <p className="file-description">{file.shortDescription}</p>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/details/${file._id}`)}
                      className="file-action-btn"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              )),
              <Ads key={`ad-${Math.random()}`} type="row" />
            )}
          </div>
        ) : (
          !error && (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No results found</h3>
              <p>Try adjusting your search criteria.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default SearchPage;
