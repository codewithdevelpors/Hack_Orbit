import React, { useState, useEffect } from 'react';
import './RightAd.css';

/**
 * RightAd Component
 * 
 * A specialized ad component designed for the right sidebar of the layout.
 * Features:
 * - Sticky positioning that follows scroll
 * - Responsive design for different screen sizes
 * - Optional auto-hide functionality
 * - Click tracking capabilities
 * - Different styling from LeftAd for visual distinction
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.autoHide - Whether to auto-hide the ad after a timeout
 * @param {number} props.hideAfter - Time in milliseconds before auto-hiding (default: 35000)
 * @param {Function} props.onAdClick - Callback function when ad is clicked
 * @param {Function} props.onAdClose - Callback function when ad is closed/hidden
 * @param {string} props.adContent - Custom ad content or URL
 * @param {boolean} props.showAnimation - Whether to show entrance animation
 */
function RightAd({ 
  autoHide = false, 
  hideAfter = 35000, 
  onAdClick, 
  onAdClose,
  adContent,
  showAnimation = true
}) {
  // State to control ad visibility
  const [isVisible, setIsVisible] = useState(true);
  // State to control animation
  const [isAnimated, setIsAnimated] = useState(false);

  // Effect to handle entrance animation
  useEffect(() => {
    if (showAnimation) {
      // Delay animation to create staggered effect with left ad
      const animationTimer = setTimeout(() => {
        setIsAnimated(true);
      }, 500);
      
      return () => clearTimeout(animationTimer);
    } else {
      setIsAnimated(true);
    }
  }, [showAnimation]);

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
    console.log('Right Ad clicked');
    
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
    <div className={`right-ad-container ${isAnimated ? 'animated' : ''}`}>
      {/* Close button for manual hiding */}
      <button 
        className="right-ad-close-btn" 
        onClick={handleClose}
        aria-label="Close right advertisement"
      >
        ×
      </button>
      
      {/* Main ad content area */}
      <div 
        className="right-ad-content" 
        onClick={handleAdClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleAdClick()}
      >
        <div className="right-ad-placeholder">
          {/* Ad icon/visual indicator */}
          <div className="right-ad-icon">🎯</div>
          
          {/* Ad text content */}
          <div className="right-ad-text">
            <h4>Right Side Ad</h4>
            <p>{adContent || 'Featured content here'}</p>
          </div>
          
          {/* Call-to-action button */}
          <div className="right-ad-cta">
            <span>Learn More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightAd;