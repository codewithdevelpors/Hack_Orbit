import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src="/logo.fav" alt="Code Galaxy Logo" />
        <h2>Code Galaxy</h2>
      </div>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      <div className="footer-social">
        <a href="https://youtube.com">YouTube</a>
        <a href="https://facebook.com">Facebook</a>
        <a href="https://tiktok.com">TikTok</a>
        <a href="https://instagram.com">Instagram</a>
      </div>
      <div className="footer-legal">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
        <Link to="/about">About Us</Link>
      </div>
    </footer>
  );
}

export default Footer;
