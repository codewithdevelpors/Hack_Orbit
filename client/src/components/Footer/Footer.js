import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section: Logo, Name, and Slogan */}
        <div className="footer-left">
          <div className="footer-brand">
            <img src="/logo.png" alt="Code Galaxy Logo" className="footer-logo" />
            <div className="footer-brand-text">
              <h2 className="footer-name">Code Galaxy</h2>
              <p className="footer-slogan">Explore the Universe of Code</p>
            </div>
          </div>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="footer-center">
          <div className="footer-nav">
            <h3 className="footer-nav-title">Quick Links</h3>
            <ul className="footer-nav-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Right Section: Social Media Links */}
        <div className="footer-right">
          <div className="footer-social">
            <h3 className="footer-social-title">Follow Us</h3>
            <ul className="footer-social-list">
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <span className="social-icon">📺</span> YouTube
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <span className="social-icon">📘</span> Facebook
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                  <span className="social-icon">🎵</span> TikTok
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <span className="social-icon">📷</span> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section: Legal Links and Copyright */}
      <div className="footer-bottom">
        <div className="footer-legal">
          <Link to="/privacy">Privacy Policy</Link>
          <span className="separator">•</span>
          <Link to="/terms">Terms of Service</Link>
          <span className="separator">•</span>
          <Link to="/about">About Us</Link>
        </div>
        <div className="footer-copyright">
          <p>&copy; 2024 Code Galaxy. All rights reserved. This website is copyright protected.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
