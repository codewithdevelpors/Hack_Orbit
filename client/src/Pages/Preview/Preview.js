import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Preview.css";
import { getFileDetails } from "../../utils/api";

function Preview() {
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
    <div className="preview">
      <h1>Preview: {file.fileName}</h1>
      <pre>{file.pageDescription}</pre>
      <button onClick={() => navigator.clipboard.writeText(file.pageDescription)}>Copy</button>
      <button onClick={() => window.history.back()}>Close</button>
    </div>
  );
}

export default Preview;
