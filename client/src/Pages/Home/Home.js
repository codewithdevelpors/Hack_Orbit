import React, { useEffect, useState } from "react";
import "./Home.css";
import { getFiles } from "../../utils/api";
import Banner from "../../components/Banner/Banner";
import Ads from "../../components/Ads/Ads";
import RateUs from "../../components/RateUs/RateUs";
import { useNavigate } from "react-router-dom";

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
      <h1>Welcome to Code Galaxy</h1>
      <Banner />

      <div className="content">
        <Ads type="side" />
        <div className="placeholders">
          {files.length > 0 ? (
            (() => {
              const rows = [];
              for (let i = 0; i < files.length; i += 2) {
                rows.push(files.slice(i, i + 2));
              }
              return rows.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <div className="placeholder-row">
                    {row.map((file) => (
                      <div key={file._id} className="placeholder">
                        <img src={file.imgUrl} alt={file.fileName} />
                        <h3>{file.fileName}</h3>
                        <p>{file.type} | {file.category === 'free' ? 'Free' : 'Paid'}</p>
                        <p>Created: {new Date(file.createdDate).toLocaleDateString()}</p>
                        <p>{file.shortDescription}</p>
                        <button onClick={() => handleNextClick(file)}>Next</button>
                      </div>
                    ))}
                  </div>
                  {(rowIndex + 1) % 3 === 0 && rowIndex < rows.length - 1 && <Ads type="row" />}
                </React.Fragment>
              ));
            })()
          ) : (
            <p>Welcome! Data cannot be fetched right now.</p>
          )}
        </div>
        <Ads type="side" />
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>

      {showRatePopup && selectedFile && (
        <RateUs fileId={selectedFile._id} onClose={handleRateClose} />
      )}
    </div>
  );
}

export default Home;
