/**
 * Footer Component
 *
 * The main footer component for the application that provides:
 * - Brand identity with logo and slogan
 * - Quick navigation links
 * - Social media links with external target handling
 * - Legal links (Privacy Policy, Terms of Service)
 * - Copyright information
 *
 * Features:
 * - Three-column responsive layout (brand, navigation, social)
 * - External link security with rel="noopener noreferrer"
 * - Accessible link structure
 * - Brand consistency with header navigation
 * - SEO-friendly footer structure
 */

import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

/**
 * Footer functional component
 * Renders the complete site footer with branding, navigation, and legal information
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section: Brand Identity */}
        <div className="footer-left">
          <div className="footer-brand">
            {/* Brand logo - matches navbar branding */}
            <img src="/favicon.ico" alt="HackOrbit Logo" className="footer-logo" />
            <div className="footer-brand-text">
              {/* Main brand name */}
              <h2 className="footer-name">HackOrbit</h2>
              {/* Brand tagline/slogan */}
              <p className="footer-slogan">Explore the Universe of Code</p>
            </div>
          </div>
        </div>

        {/* Center Section: Quick Navigation */}
        <div className="footer-center">
          <div className="footer-nav">
            <h3 className="footer-nav-title">Quick Links</h3>
            <ul className="footer-nav-list">
              {/* Primary navigation links using React Router Link for SPA navigation */}
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Right Section: Social Media Presence */}
        <div className="footer-right">
          <div className="footer-social">
            <h3 className="footer-social-title">Follow Us</h3>
            <ul className="footer-social-list">
              {/*
                External social media links with security attributes:
                - target="_blank": Opens in new tab
                - rel="noopener noreferrer": Security measure to prevent window.opener access
              */}
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

      {/* Bottom Section: Legal Information and Copyright */}
      <div className="footer-bottom">
        {/* Legal page links */}
        <div className="footer-legal">
          <Link to="/privacy">Privacy Policy</Link>
          <span className="separator">•</span>
          <Link to="/terms">Terms of Service</Link>
          <span className="separator">•</span>
          <Link to="/about">About Us</Link>
        </div>
        {/* Copyright notice */}
        <div className="footer-copyright">
          <p>&copy; 2024 HackOrbit. All rights reserved. This website is copyright protected.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
