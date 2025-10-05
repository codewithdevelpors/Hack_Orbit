import React, { useState, useEffect } from 'react';
import './Ads.css';

function Ads({ type, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (type === 'popup') {
      // Auto-hide popup after 10 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  const renderAdContent = () => (
    <div className="ad-content">
      <div className="ad-placeholder">
        <div className="ad-icon">📢</div>
        <div className="ad-text">
          <h4>Advertisement</h4>
          <p>Your ad content here</p>
        </div>
      </div>
    </div>
  );

  switch (type) {
    case 'side':
      return (
        <div className="ads-side">
          {renderAdContent()}
        </div>
      );

    case 'popup':
      return (
        <div className="ads-popup-overlay">
          <div className="ads-popup">
            <button className="ads-close-btn" onClick={handleClose}>×</button>
            {renderAdContent()}
          </div>
        </div>
      );

    case 'popup-top-right':
      return (
        <div className="ads-popup-overlay top-right">
          <div className="ads-popup">
            <button className="ads-close-btn" onClick={handleClose}>×</button>
            {renderAdContent()}
          </div>
        </div>
      );

    case 'row':
      return (
        <div className="ads-row">
          {renderAdContent()}
        </div>
      );

    default:
      return null;
  }
}

export default Ads;