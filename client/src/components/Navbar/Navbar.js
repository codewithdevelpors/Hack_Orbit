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

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import "./Navbar.css";
import { THEMES, STORAGE_KEYS } from "../../constants";
import { searchFiles } from "../../utils/api";

/**
 * Main Navbar functional component
 * Handles all navigation, search, and theme functionality
 */
function Navbar() {
  // Theme state - initialized from localStorage or defaults to light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.theme) || THEMES.light;
  });
  

  // Search functionality state
  const [searchQuery, setSearchQuery] = useState("");

  // Dropdown menu states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Navbar auto-hide functionality states
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Menu icon state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);

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

  /**
   * Handle category selection and fetch data from database
   * @param {string} category - The selected category (free or paid)
   * @param {string} type - The selected type (python or html-css)
   */
  const handleCategorySelect = async (category, type) => {
    try {
      const data = await searchFiles({ category, type });
      // Navigate to search page with category and type filters
      navigate(`/search?category=${category}&type=${type}`);
      setIsDropdownOpen(false);
      setIsSubmenuOpen(false);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  /**
   * Toggle submenu for free/paid categories
   * @param {string} category - The category to toggle submenu for
   */
  const toggleSubmenu = (category) => {
    setSelectedCategory(category);
    setIsSubmenuOpen(true);
  };

  /**
   * Toggle menu icon between hamburger and cancel
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Toggle menu dropdown
   */
  const toggleMenuDropdown = () => {
    setIsMenuDropdownOpen(!isMenuDropdownOpen);
  };



  return (
    <nav className={`navbar ${isHidden ? 'navbar-hidden' : ''}`}>
      <div className="navbar-container">
        {/* Main Navigation Row - Only search and theme toggle */}
        <div className={`navbar-main ${isMenuOpen ? 'menu-open' : ''}`}>
          <div className="navbar-brand">
            <a className="navbar-logo" href="/">
              <img src="/favicon.ico" alt="HackOrbit Logo" class="logo-icon"/>
                <span class="logo-text">
                 HackOrbit
                </span>
            </a>
          </div>
          <div class="navbar-nav-section open">
    <a class="navbar-link modern-nav-item" href="/">
        <span class="nav-icon">🏠</span>
        <span class="nav-text">Home</span>
    </a>
    <div className="navbar-dropdown modern-nav-item" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => { setIsDropdownOpen(false); setIsSubmenuOpen(false); setSelectedCategory(null); }}>
        <button className="navbar-dropdown-btn">
            <span className="nav-icon">📂</span>
            <span className="nav-text">Categories</span>
            <span className="dropdown-arrow">{isDropdownOpen ? '▲' : '▼'}</span>
        </button>
        {isDropdownOpen && (
            <div className="navbar-dropdown-menu">
                <button
                    className="navbar-dropdown-item"
                    onMouseEnter={() => toggleSubmenu('free')}
                    onMouseLeave={() => { setIsSubmenuOpen(false); setSelectedCategory(null); }}
                >
                    Free
                </button>
                <button
                    className="navbar-dropdown-item"
                    onMouseEnter={() => toggleSubmenu('paid')}
                    onMouseLeave={() => { setIsSubmenuOpen(false); setSelectedCategory(null); }}
                >
                    Paid
                </button>
                {isSubmenuOpen && selectedCategory && (
                    <div className="navbar-submenu" onMouseEnter={() => setIsSubmenuOpen(true)} onMouseLeave={() => setIsSubmenuOpen(false)}>
                        <button
                            className="navbar-dropdown-item"
                            onClick={() => handleCategorySelect(selectedCategory, 'python')}
                        >
                            Python
                        </button>
                        <button
                            className="navbar-dropdown-item"
                            onClick={() => handleCategorySelect(selectedCategory, 'html-css')}
                        >
                            HTML & CSS
                        </button>
                    </div>
                )}
            </div>
        )}
    </div>
    <a class="navbar-link modern-nav-item" href="/about">
        <span class="nav-icon">ℹ️</span>
        <span class="nav-text">About Us</span>
    </a>
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



          {/* Menu Icon */}
          <div className="menu-icon-container">
            <div className="menu-dropdown">
              <span className="menu-icon" onClick={toggleMenuDropdown}>
                {isMenuDropdownOpen ? '✕' : '☰'}
              </span>
              {isMenuDropdownOpen && (
                <div className="menu-dropdown-menu">
                  <button
                    className="menu-dropdown-item"
                    onClick={toggleTheme}
                  >
                    <span className="menu-icon">🎨</span>
                    <span>Themes</span>
                  </button>
                  <button
                    className="menu-dropdown-item"
                    onClick={toggleTheme}
                  >
                    <span className="menu-icon">
                      {theme === THEMES.dark ? "☀️" : "🌙"}
                    </span>
                    <span>Dark Mode</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
