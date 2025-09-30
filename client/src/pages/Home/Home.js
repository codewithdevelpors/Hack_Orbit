import React, { useEffect, useState } from "react";
import "./Home.css";
import { getFiles } from "../../utils/api";
import { Card, CardContent, CardImage } from "../../ui/Card";
import Button from "../../ui/Button";
import Banner from "../../components/Banner/Banner";
import Ads from "../../components/Ads/Ads";
import RateUs from "../../components/RateUs/RateUs";
import { useNavigate } from "react-router-dom";
import { FILE_TYPES, CATEGORIES } from "../../constants";

function Home() {
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showRatePopup, setShowRatePopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFiles(page);
        setFiles(data);
      } catch (err) {
        console.error("Failed to fetch files", err);
      }
    };
    fetchData();
  }, [page]);

  const handleNextClick = (file) => {
    setSelectedFile(file);
    setShowRatePopup(true);
  };

  const handleRateClose = () => {
    setShowRatePopup(false);
    if (selectedFile) {
      navigate(`/details/${selectedFile._id}`);
    }
  };

  return (
    <div className="home">
      {/* Side Ads */}
      <Ads type="side" position="left" />
      <Ads type="side" position="right" />

      <div className="hero-section">
        <h1 className="hero-title">Welcome to Code Galaxy</h1>
        <p className="hero-subtitle">Discover amazing Python programs and code snippets</p>
      </div>

      <Banner />

      <div className="container">
        <div className="content-grid">
          <div className="main-content">
            <div className="files-section">
              <h2 className="section-title">Featured Programs</h2>

              {files.length > 0 ? (
                <div className="files-grid">
                  {files.map((file, index) => (
                    <React.Fragment key={file._id}>
                      <Card
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
                            onClick={() => handleNextClick(file)}
                            className="file-action-btn"
                          >
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                      {(index + 1) % 3 === 0 && <Ads type="row" className="ad-row" />}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📁</div>
                  <h3>No programs found</h3>
                  <p>Data cannot be fetched right now. Please try again later.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {files.length > 0 && (
              <div className="pagination">
                <Button
                  variant="secondary"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                <span className="page-info">Page {page}</span>
                <Button
                  variant="secondary"
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showRatePopup && selectedFile && (
        <RateUs fileId={selectedFile._id} onClose={handleRateClose} />
      )}
    </div>
  );
}

export default Home;
