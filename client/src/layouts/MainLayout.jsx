import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Ads from '../components/Ads/Ads';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-content">
        <div className="content-with-ads">
          {/* Side Ads */}
          <Ads type="side" position="left" />
          <Ads type="side" position="right" />
          
          <div className="page-content">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;