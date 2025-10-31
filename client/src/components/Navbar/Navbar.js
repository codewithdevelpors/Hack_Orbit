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
import { useTranslation } from 'react-i18next';
import Button from "../../ui/Button";
import "./Navbar.css";
import { THEMES, STORAGE_KEYS } from "../../constants";
import { searchFiles } from "../../utils/api";

/**
 * Main Navbar functional component
 * Handles all navigation, search, and theme functionality
 */
function Navbar() {
  const { t } = useTranslation();

  // Theme state - initialized from localStorage or defaults to light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.theme) || THEMES.light;
  });


  // Search functionality state
  const [searchQuery, setSearchQuery] = useState("");

  // Dropdown menu states - removed click-based states for hover
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFreeSubmenuOpen, setIsFreeSubmenuOpen] = useState(false);
 const [isPaidSubmenuOpen, setIsPaidSubmenuOpen] = useState(false);
  // Navbar auto-hide functionality states
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Menu icon state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const [isSettingsSubmenuOpen, setIsSettingsSubmenuOpen] = useState(false);

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
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  /**
   * Handle submenu hover for free/paid categories
   * @param {string} category - The category to show submenu for
   */
  const handleSubmenuHover = (category) => {
    setSelectedCategory(category);
  };

  /**
   * Clear submenu on mouse leave
   */
  const handleSubmenuLeave = () => {
    setSelectedCategory(null);
    setIsFreeSubmenuOpen(false);
    setIsPaidSubmenuOpen(false);
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
    // Reset settings submenu when main menu closes
    if (isMenuDropdownOpen) {
      setIsSettingsSubmenuOpen(false);
    }
  };

  /**
   * Toggle settings submenu
   */
  const toggleSettingsSubmenu = () => {
    setIsSettingsSubmenuOpen(!isSettingsSubmenuOpen);
  };





  return (
    <nav className={`navbar ${isHidden ? 'navbar-hidden' : ''}`}>
      <div className="navbar-container">
        {/* Main Navigation Row - Logo left, menu icon right */}
        <div className={`navbar-main ${isMenuOpen ? 'menu-open' : ''}`}>
          <div className="navbar-brand">
            <a className="navbar-logo" href="/">
              <img src="/favicon.ico" alt="HackOrbit Logo" className="logo-icon"/>
              <span className="logo-text">
                HackOrbit
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links - Hidden on mobile/tablet */}
          <div className="navbar-nav-section desktop-nav">
            <a className="navbar-link" href="/">
              <span className="nav-icon">🏠</span>
              {t('home')}
            </a>
            <div className="navbar-dropdown desktop-dropdown" onMouseEnter={() => handleSubmenuHover('categories')} onMouseLeave={handleSubmenuLeave}>
              <button className="navbar-dropdown-btn">
                <span className="nav-icon">📂</span>
                {t('categories')}
                <span className="dropdown-arrow">▼</span>
              </button>
              {selectedCategory === 'categories' && (
                <div className="navbar-dropdown-menu">
                  <button className="navbar-dropdown-item" onClick={() => setIsFreeSubmenuOpen(!isFreeSubmenuOpen)}>
                      Free
                      <span className="dropdown-arrow">{isFreeSubmenuOpen ? '▲' : '▼'}</span>
                    </button>
                    {isFreeSubmenuOpen && (
                      <div className="navbar-submenu">
                        <a href="/search?category=free&type=python" className="navbar-dropdown-item">
                          Python
                        </a>
                        <a href="/search?category=free&type=html-css" className="navbar-dropdown-item">
                          Html & Css
                        </a>
                      </div>
                    )}
                    <button className="navbar-dropdown-item" onClick={() => setIsPaidSubmenuOpen(!isPaidSubmenuOpen)}>
                      Paid
                      <span className="dropdown-arrow">{isPaidSubmenuOpen ? '▲' : '▼'}</span>
                    </button>
                    {isPaidSubmenuOpen && (
                      <div className="navbar-submenu">
                        <a href="/search?category=paid&type=management" className="navbar-dropdown-item">
                          Management
                        </a>
                        <a href="/search?category=paid&type=billing" className="navbar-dropdown-item">
                          Billing
                        </a>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>

          {/* Modern Search Bar - Desktop */}
          <div className="modern-search desktop-search">
            <form onSubmit={handleSearch} className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="navbar-search-input"
              />
              <button type="submit" className="search-btn">
                Search
              </button>
            </form>
          </div>

          {/* Modern Theme Toggle - Desktop */}
          <div className="theme-toggle-container desktop-theme">
            <button className="modern-theme-toggle" onClick={toggleTheme}>
              <span className="theme-icon">
                {theme === THEMES.dark ? "☀️" : "🌙"}
              </span>
              <span className="theme-text">
                {theme === THEMES.dark ? t('lightMode') : t('darkMode')}
              </span>
            </button>
          </div>

          {/* Search Icon - Mobile/Tablet only */}
          <div className="search-icon-container mobile-tablet-only">
            <span className="search-icon" onClick={toggleMenu}>
              🔍
            </span>
          </div>

          {/* Menu Icon Container - Mobile/Tablet only */}
          <div className="menu-icon-container">
            <div className="menu-dropdown">
              <span className="menu-icon" onClick={toggleMenuDropdown}>
                {isMenuDropdownOpen ? '✕' : '☰'}
              </span>
              {isMenuDropdownOpen && (
                <div className="menu-dropdown-menu">
                  {/* Home Link */}
                  <a
                    className="menu-dropdown-item"
                    href="/"
                    onClick={() => setIsMenuDropdownOpen(false)}
                  >
                    <span className="menu-icon">🏠</span>
                    <span>{t('home')}</span>
                  </a>

                  {/* Categories Dropdown */}
                  <div className="menu-dropdown-submenu" onMouseEnter={() => handleSubmenuHover('categories')} onMouseLeave={handleSubmenuLeave}>
                    <div
                      className="menu-dropdown-item"
                    >
                      <span className="menu-icon">📂</span>
                      <span>{t('categories')}</span>
                      <span className="dropdown-arrow">▼</span>
                    </div>
                    {selectedCategory === 'categories' && (
                      <div className="menu-submenu">
                        
                        <button
                          className="menu-dropdown-item submenu-item"
                          onClick={() => { handleCategorySelect('free', 'python'); setIsMenuDropdownOpen(false); }}
                        >
                          {t('free')} {t('python')}
                        </button>
                        
                        <button
                          className="menu-dropdown-item submenu-item"
                          onClick={() => { handleCategorySelect('free', 'html-css'); setIsMenuDropdownOpen(false); }}
                        >
                          {t('free')} {t('htmlCss')}
                        </button>



                        <button
                          className="menu-dropdown-item submenu-item"
                          onClick={() => { handleCategorySelect('paid', 'management'); setIsMenuDropdownOpen(false); }}
                        >
                          {t('paid')} Management
                        </button>

                        <button
                          className="menu-dropdown-item submenu-item"
                          onClick={() => { handleCategorySelect('paid', 'billing'); setIsMenuDropdownOpen(false); }}
                        >
                          {t('paid')} Billing
                        </button>
                        {/* 
                        <button
                          className="menu-dropdown-item submenu-item"
                          onClick={() => { handleCategorySelect('paid', 'python'); setIsMenuDropdownOpen(false); }}
                        >
                          {t('paid')}
                        </button>
                        
                      */}
                      </div>
                    )}
                  </div>

                  {/* Themes Link */}
                  <a
                    className="menu-dropdown-item"
                    href="/themes"
                    onClick={() => setIsMenuDropdownOpen(false)}
                  >
                    <span className="menu-icon">🎨</span>
                    <span>{t('themes')}</span>
                  </a>

                  {/* About Us Link */}
                  <a
                    className="menu-dropdown-item"
                    href="/about"
                    onClick={() => setIsMenuDropdownOpen(false)}
                  >
                    <span className="menu-icon">ℹ️</span>
                    <span>{t('about')}</span>
                  </a>

                  {/* Search Bar in Menu */}
                  <div className="menu-search-container">
                    <form onSubmit={(e) => { handleSearch(e); setIsMenuDropdownOpen(false); }} className="menu-search-form">
                      <div className="menu-search-input-container">
                        <span className="search-icon">🔍</span>
                        <input
                          type="text"
                          placeholder={t('searchPlaceholder')}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="menu-search-input"
                        />
                        <button type="submit" className="menu-search-btn">
                          <span>Search</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Settings Submenu */}
                  <div className="menu-dropdown-submenu">
                    <button
                      className="menu-dropdown-item"
                      onClick={toggleSettingsSubmenu}
                    >
                      <span className="menu-icon">⚙️</span>
                      <span>Settings</span>
                      <span className="dropdown-arrow">{isSettingsSubmenuOpen ? '▲' : '▼'}</span>
                    </button>
                    {isSettingsSubmenuOpen && (
                      <div className="menu-submenu" onMouseLeave={() => setIsSettingsSubmenuOpen(false)}>
                        {/* Theme Toggle in Settings */}
                        <button
                          className="menu-dropdown-item submenu-item"
                          onClick={toggleTheme}
                        >
                          <span className="menu-icon">
                            {theme === THEMES.dark ? "☀️" : "🌙"}
                          </span>
                          <span>{theme === THEMES.dark ? t('lightMode') : t('darkMode')}</span>
                        </button>

                        {/* Language Link in Settings */}
                        <a
                          className="menu-dropdown-item submenu-item"
                          href="/languages"
                          onClick={() => setIsMenuDropdownOpen(false)}
                        >
                          <span className="menu-icon">🌐</span>
                          <span>{t('language')}</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Privacy Policy Link */}
                  <a
                    className="menu-dropdown-item"
                    href="/privacy"
                    onClick={() => setIsMenuDropdownOpen(false)}
                  >
                    <span className="menu-icon">🔒</span>
                    <span>Privacy Policy</span>
                  </a>

                  {/* Terms of Service Link */}
                  <a
                    className="menu-dropdown-item"
                    href="/terms"
                    onClick={() => setIsMenuDropdownOpen(false)}
                  >
                    <span className="menu-icon">📋</span>
                    <span>Terms of Service</span>
                  </a>
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
