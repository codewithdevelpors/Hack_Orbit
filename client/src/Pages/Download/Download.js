import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Download.css";
import { downloadFile } from "../../utils/api";
import Ads from "../../components/Ads/Ads";

function Download() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const fetchFile = async () => {
      const data = await downloadFile(id);
      setFile(data);
    };
    fetchFile();
  }, [id]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (file?.fileUrl) {
      window.location.href = file.fileUrl;
    }
  }, [countdown, file]);

  if (!file) return <p>Loading...</p>;

  return (
    <div className="download">
      <h1>Download: {file.fileName}</h1>
      <img src={file.imgUrl} alt={file.fileName} />
      {countdown > 0 ? (
        <p>Download starts in {countdown} seconds...</p>
      ) : (
        <p>If download didn’t start, <a href={file.fileUrl}>click here</a>.</p>
      )}
      <Ads type="row" />
    </div>
  );
}

export default Download;
