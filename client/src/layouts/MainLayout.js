import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Ads from '../components/Ads/Ads';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup ad after 5 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-content">
        <div className="content-with-ads">
          {/* Left Side Ad */}
          <div className="left-ad">
            <Ads type="side" />
          </div>

          <div className="page-content">
            {children}
          </div>

          {/* Right Side Ad */}
          <div className="right-ad">
            <Ads type="side" />
          </div>
        </div>
      </main>
      <Footer />

      {/* Popup Ad */}
      {showPopup && (
        <Ads type="popup-top-right" onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default MainLayout;