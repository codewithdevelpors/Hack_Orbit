/**
 * Navbar Component
 *
 * The main navigation component for the application that provides:
 * - Brand logo and navigation links
 * - Search functionality with query handling
 * - Theme toggle (light/dark mode)
 * - Responsive mobile menu
 * - Auto-hide on scroll down functionality
 * - Category dropdown menus with submenus
 *
 * Features:
 * - Sticky navigation with scroll behavior
 * - Keyboard and mouse interaction support
 * - Local storage theme persistence
 * - Mobile-first responsive design
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import "./Navbar.css";
import { THEMES, STORAGE_KEYS } from "../../constants";

/**
 * Main Navbar functional component
 * Handles all navigation, search, and theme functionality
 */
function Navbar() {
  // Theme state - initialized from localStorage or defaults to light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.theme) || THEMES.light;
  });
  
  // Dropdown menu states for category navigation
  const [showCategories, setShowCategories] = useState(false);
  const [showFreeSub, setShowFreeSub] = useState(false);
  
  // Search functionality state
  const [searchQuery, setSearchQuery] = useState("");
  

  
  // Navbar auto-hide functionality states
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Navigation hook for programmatic routing
  const navigate = useNavigate();

  /**
   * Effect to handle theme changes
   * Updates the DOM data-theme attribute and persists theme preference to localStorage
   */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  /**
   * Effect to handle navbar auto-hide on scroll
   * Hides navbar when scrolling down past 100px, shows when scrolling up
   * Uses passive event listener for better performance
   */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px threshold - hide navbar
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsHidden(false);
      }

      // Update last scroll position for next comparison
      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener with passive flag for performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  /**
   * Toggle between light and dark themes
   * Switches theme state between THEMES.light and THEMES.dark
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === THEMES.light ? THEMES.dark : THEMES.light);
  };

  /**
   * Handle search form submission
   * Navigates to search page with encoded query parameter
   *
   * @param {Event} e - Form submission event
   */
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search page with URL-encoded query
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };



  return (
    <nav className={`navbar ${isHidden ? 'navbar-hidden' : ''}`}>
      <div className="navbar-container">
        {/* Logo and Brand Name */}
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            <img src="/favicon.ico" alt="HackOrbit Logo" className="logo-icon" />
            <span className="logo-text">HackOrbit</span>
          </Link>
        </div>



        {/* Main Navigation Row - All elements in one amazing line */}
        <div className="navbar-main">
          {/* Navigation Links with Icons */}
          <div className="navbar-nav-section">
            <Link to="/" className="navbar-link modern-nav-item">
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Home</span>
            </Link>

            <div
              className="navbar-dropdown modern-nav-item"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => {
                setShowCategories(false);
                setShowFreeSub(false);
              }}
            >
              <button className="navbar-dropdown-btn">
                <span className="nav-icon">📂</span>
                <span className="nav-text">Categories</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              
              {showCategories && (
                <div className="navbar-dropdown-menu modern-dropdown">
                  <div
                    className="navbar-dropdown-item"
                    onMouseEnter={() => setShowFreeSub(true)}
                    onMouseLeave={() => setShowFreeSub(false)}
                  >
                    <span>🆓 Free Programs</span>
                    {showFreeSub && (
                      <div className="navbar-submenu">
                        <Link to="/search?category=free&type=python">
                          🐍 Python
                        </Link>
                        <Link to="/search?category=free&type=htmlcss">
                          🎨 HTML & CSS
                        </Link>
                      </div>
                    )}
                  </div>
                  <Link to="/search?category=paid" className="navbar-dropdown-item">
                    💎 Paid Programs
                  </Link>
                </div>
              )}
            </div>

            <Link to="/about" className="navbar-link modern-nav-item" onClick={closeMenu}>
              <span className="nav-icon">ℹ️</span>
              <span className="nav-text">About Us</span>
            </Link>
          </div>

          {/* Modern Search Bar */}
          <form onSubmit={handleSearch} className="navbar-search modern-search">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search amazing programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="navbar-search-input"
              />
              <button type="submit" className="search-btn">
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Modern Theme Toggle */}
          <div className="theme-toggle-container">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="theme-toggle modern-theme-toggle"
              title={`Switch to ${theme === THEMES.dark ? 'Light' : 'Dark'} Mode`}
            >
              <span className="theme-icon">
                {theme === THEMES.dark ? "☀️" : "🌙"}
              </span>{/*
              <span className="theme-text">
                {theme === THEMES.dark ? "Light" : "Dark"}
              </span>*/}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
