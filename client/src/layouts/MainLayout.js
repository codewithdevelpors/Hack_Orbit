/**
 * MainLayout Component
 *
 * The main layout wrapper component that provides the overall page structure.
 * Includes navigation, footer, side advertisements, and optional popup ads.
 *
 * Features:
 * - Responsive layout with sidebar ads
 * - Optional popup advertisement system
 * - Sticky navigation and footer
 * - Centered content area with side advertisements
 */

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import LeftAd from '../components/LeftAd/LeftAd';
import RightAd from '../components/RightAd/RightAd';
import Ads from '../components/Ads/Ads';
import './MainLayout.css';

/**
 * MainLayout component that wraps all pages
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to be rendered
 */
const MainLayout = ({ children }) => {
  const location = useLocation();

  // State to control popup ad visibility
  const [showPopup, setShowPopup] = useState(false);

  // State to track ad interactions for analytics
  const [adInteractions, setAdInteractions] = useState({
    leftAdClicks: 0,
    rightAdClicks: 0,
    popupShown: false
  });

  /**
   * Effect to handle popup ad timing
   * Currently commented out - uncomment to enable popup ads
   */
  /*
  useEffect(() => {
    // Show popup ad after 5 seconds on initial page load
    const timer = setTimeout(() => {
      setShowPopup(true);
      setAdInteractions(prev => ({ ...prev, popupShown: true }));
    }, 5000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);
  */

  /**
   * Handle left ad clicks for tracking
   */
  const handleLeftAdClick = () => {
    setAdInteractions(prev => ({
      ...prev,
      leftAdClicks: prev.leftAdClicks + 1
    }));
    console.log('Left ad clicked - total clicks:', adInteractions.leftAdClicks + 1);
  };

  /**
   * Handle right ad clicks for tracking
   */
  const handleRightAdClick = () => {
    setAdInteractions(prev => ({
      ...prev,
      rightAdClicks: prev.rightAdClicks + 1
    }));
    console.log('Right ad clicked - total clicks:', adInteractions.rightAdClicks + 1);
  };

  /**
   * Handle popup ad close
   */
  const handlePopupClose = () => {
    setShowPopup(false);
    console.log('Popup ad closed by user');
  };

  return (
    <div className="main-layout">
      {/* Main navigation component */}
      <Navbar />
      
      {/* Main content area */}
      <main className="main-content">
        <div className="content-with-ads">
          {/* Left side advertisement */}
          <div className="left-ad">
            <LeftAd
              autoHide={false}
              onAdClick={handleLeftAdClick}
              adContent="Sponsored Content"
            />
          </div>

          {/* Main page content area */}
          <div className="page-content">
            {children}
          </div>

          {/* Right side advertisement */}
          <div className="right-ad">
            <RightAd
              autoHide={false}
              onAdClick={handleRightAdClick}
              adContent="Premium Ads"
            />
          </div>
        </div>
      </main>



      {/* Site footer */}
      <Footer />


    </div>
  );
};

export default MainLayout;