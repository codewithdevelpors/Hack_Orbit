import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Details.css";
import { getFileDetails } from "../../utils/api";
import Ads from "../../components/Ads/Ads";

function Details() {
  const { id } = useParams();
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      const data = await getFileDetails(id);
      setFile(data);
    };
    fetchFile();
  }, [id]);

  if (!file) return <p>Loading...</p>;

  return (
    <div className="details">
      <h1>{file.fileName}</h1>
      <p>{file.pageDescription}</p>
      <p>Type: {file.type} | Category: {file.category}</p>
      <p>Created: {new Date(file.createdDate).toLocaleDateString()}</p>

      {file.type !== "html&css" ? (
        <>
          <Link to={`/preview/${file._id}`}><button>Preview</button></Link>
          <Link to={`/download/${file._id}`}><button>Download</button></Link>
        </>
      ) : (
        <>
          <Link to={`/preview/${file._id}?type=html`}><button>Preview HTML</button></Link>
          <Link to={`/preview/${file._id}?type=css`}><button>Preview CSS</button></Link>
        </>
      )}

      <Ads type="row" />
    </div>
  );
}

export default Details;
