import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-content">
        <div className="content-with-ads">
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