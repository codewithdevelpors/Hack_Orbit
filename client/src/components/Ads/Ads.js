/**
 * Ads Component - Generic Advertisement Display Component
 *
 * A versatile advertisement component that supports multiple display types and positions.
 * This component serves as a fallback/generic ad system alongside the specialized
 * LeftAd and RightAd components.
 *
 * Features:
 * - Multiple ad types: side, popup, popup-top-right, row
 * - Auto-hide functionality for popup ads
 * - Manual close capability
 * - Responsive design
 * - Customizable content
 *
 * @param {Object} props - Component props
 * @param {string} props.type - Type of ad display ('side', 'popup', 'popup-top-right', 'row')
 * @param {Function} props.onClose - Callback function when ad is closed
 */

import React, { useState, useEffect } from 'react';
import './Ads.css';

function Ads({ type, onClose }) {
  // State to control ad visibility
  const [isVisible, setIsVisible] = useState(true);

  /**
   * Effect to handle auto-hide functionality for popup ads
   * Automatically hides popup ads after 10 seconds to improve user experience
   */
  useEffect(() => {
    if (type === 'popup') {
      // Auto-hide popup after 10 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 10000);

      // Cleanup timer on component unmount or dependency change
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  /**
   * Handle manual ad close action
   * Called when user clicks the close button
   */
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  // Don't render if ad is not visible
  if (!isVisible) return null;

  /**
   * Renders the common ad content structure
   * Used by all ad types to maintain consistency
   *
   * @returns {JSX.Element} The ad content JSX
   */
  const renderAdContent = () => (
    <div className="ad-content">
      {/* Google AdSense Ad Unit */}
      <ins className="adsbygoogle"
           style={{display: 'block'}}
           data-ad-client="ca-pub-5014011475160512"
           data-ad-slot="1122334455"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>
  );

  /**
   * Switch statement to render different ad types
   * Each type has its own styling and positioning
   */
  switch (type) {
    case 'side':
      // Side advertisement for sidebar placement
      return (
        <div className="ads-side">
          {renderAdContent()}
        </div>
      );

    case 'popup':
      // Full-screen popup overlay advertisement with close button
      return (
        <div className="ads-popup-overlay non-intrusive">
          <div className="ads-popup">
            <button className="ad-close-btn" onClick={handleClose}>×</button>
            {renderAdContent()}
          </div>
        </div>
      );

    case 'popup-top-right':
      // Top-right corner popup advertisement with close button
      return (
        <div className="ads-popup-overlay top-right non-intrusive">
          <div className="ads-popup">
            <button className="ad-close-btn" onClick={handleClose}>×</button>
            {renderAdContent()}
          </div>
        </div>
      );

    case 'row':
      // Horizontal row advertisement for content insertion
      return (
        <div className="ads-row">
          {renderAdContent()}
        </div>
      );

    default:
      // Return null for invalid ad types
      console.warn(`Invalid ad type: ${type}. Valid types: side, popup, popup-top-right, row`);
      return null;
  }
}

export default Ads;