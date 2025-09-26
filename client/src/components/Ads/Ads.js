import React from "react";
import "./Ads.css";

function Ads({ type }) {
  if (type === "side") {
    return <div className="ads side-ads">[Side Ads]</div>;
  }
  if (type === "popup") {
    return <div className="ads popup-ads">[Popup Ad]</div>;
  }
  if (type === "row") {
    return <div className="ads row-ads">[Row Ad]</div>;
  }
  return null;
}

export default Ads;
