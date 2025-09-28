import React, { useState } from "react";
import "./RateUs.css";
import { rateFile } from "../../utils/api";
import Ads from "../Ads/Ads";

function RateUs({ fileId, onClose }) {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      await rateFile(fileId, rating);
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit rating", err);
    }
  };

  return (
    <div className="rateus-overlay">
      <Ads type="popup" />
      <div className="rateus-popup">
        {!submitted ? (
          <>
            <h2>Rate This File</h2>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= rating ? "star filled" : "star"}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="buttons">
              <button onClick={handleSubmit} disabled={rating === 0}>Submit</button>
              <button onClick={onClose}>Close</button>
            </div>
          </>
        ) : (
          <>
            <h2>Thanks for your feedback! 🙌</h2>
            <button onClick={onClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
}

export default RateUs;
