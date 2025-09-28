import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./Preview.css";
import { getFileDetails } from "../../utils/api";

function Preview() {
  const { id } = useParams();
  const location = useLocation();
  const type = new URLSearchParams(location.search).get('type');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      const data = await getFileDetails(id);
      setFile(data);
    };
    fetchFile();
  }, [id]);

  if (!file) return <p>Loading...</p>;

  const content = type === 'html' ? file.pageDescription.split('</style>')[1] || file.pageDescription :
                  type === 'css' ? file.pageDescription.split('<style>')[1]?.split('</style>')[0] || '' :
                  file.pageDescription;

  return (
    <div className="preview">
      <h1>Preview: {file.fileName} {type ? `(${type.toUpperCase()})` : ''}</h1>
      <pre>{content}</pre>
      <button onClick={() => navigator.clipboard.writeText(content)}>Copy</button>
      <button onClick={() => window.history.back()}>Close</button>
    </div>
  );
}

export default Preview;
