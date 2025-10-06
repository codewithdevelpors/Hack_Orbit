import React, { useState, useEffect } from 'react';
import './LeftAd.css';

/**
 * LeftAd Component
 * 
 * A specialized ad component designed for the left sidebar of the layout.
 * Features:
 * - Sticky positioning that follows scroll
 * - Responsive design for different screen sizes
 * - Optional auto-hide functionality
 * - Click tracking capabilities
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.autoHide - Whether to auto-hide the ad after a timeout
 * @param {number} props.hideAfter - Time in milliseconds before auto-hiding (default: 30000)
 * @param {Function} props.onAdClick - Callback function when ad is clicked
 * @param {Function} props.onAdClose - Callback function when ad is closed/hidden
 * @param {string} props.adContent - Custom ad content or URL
 */
function LeftAd({ 
  autoHide = false, 
  hideAfter = 30000, 
  onAdClick, 
  onAdClose,
  adContent 
}) {
  // State to control ad visibility
  const [isVisible, setIsVisible] = useState(true);

  // Effect to handle auto-hide functionality
  useEffect(() => {
    if (autoHide && hideAfter > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onAdClose) onAdClose();
      }, hideAfter);

      // Cleanup timer on component unmount or dependency change
      return () => clearTimeout(timer);
    }
  }, [autoHide, hideAfter, onAdClose]);

  /**
   * Handle ad click events
   * Tracks clicks and executes callback if provided
   */
  const handleAdClick = () => {
    // Track ad click for analytics (placeholder)
    console.log('Left Ad clicked');
    
    if (onAdClick) {
      onAdClick();
    }
  };

  /**
   * Handle ad close/hide
   */
  const handleClose = () => {
    setIsVisible(false);
    if (onAdClose) onAdClose();
  };

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <div className="left-ad-container">
      {/* Close button for manual hiding */}
      <button 
        className="left-ad-close-btn" 
        onClick={handleClose}
        aria-label="Close left advertisement"
      >
        ×
      </button>
      
      {/* Main ad content area */}
      <div 
        className="left-ad-content" 
        onClick={handleAdClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleAdClick()}
      >
        <div className="left-ad-placeholder">
          {/* Ad icon/visual indicator */}
          <div className="left-ad-icon">📢</div>
          
          {/* Ad text content */}
          <div className="left-ad-text">
            <h4>Left Side Ad</h4>
            <p>{adContent || 'Premium ad space available'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftAd;