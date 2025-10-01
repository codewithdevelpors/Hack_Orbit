import React from "react";
import "./Ads.css";

function Ads({ type, position = "left" }) {
  if (type === "side") {
    return (
      <div className={`ads side-ads ${position}`}>
        <div>
          <h4>Advertisement</h4>
          <p>Side Ad Content theis eie sao df jsfj weif dsjf eio rjif sdfioes jfi djs fie fjdskfjiod fef d dfioe s flajdsf osjrei fo kdkoe dkeid fei ddkso ad osdf eosd iof adidf da oeifj dsoifjdokfjewio jef ds ddfei d</p>
          <p>Position: {position}</p>
        </div>
      </div>
    );
  }
  if (type === "popup") {
    return <div className="ads popup-ads">[Popup Ad]</div>;
  }
  if (type === "row") {
    return (
      <div className="ads row-ads">
        <div>
          <h4>Advertisement</h4>
          <p>Sponsored Content - Row Advertisement</p>
        </div>
      </div>
    );
  }
  return null;
}

export default Ads;
