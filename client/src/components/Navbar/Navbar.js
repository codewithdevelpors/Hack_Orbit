import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import "./Navbar.css";
import { THEMES, STORAGE_KEYS } from "../../constants";

function Navbar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.theme) || THEMES.light;
  });
  const [showCategories, setShowCategories] = useState(false);
  const [showFreeSub, setShowFreeSub] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === THEMES.light ? THEMES.dark : THEMES.light);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isHidden ? 'navbar-hidden' : ''}`}>
      <div className="navbar-container">
        {/* Logo and Brand Name */}
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <img src="/favicon.ico" alt="Code Galaxy Logo" className="logo-icon" />
            <span className="logo-text">Code Galaxy</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Main Navigation Row - All elements in one amazing line */}
        <div className={`navbar-main ${isMenuOpen ? 'active' : ''}`}>
          {/* Navigation Links with Icons */}
          <div className="navbar-nav-section">
            <Link to="/" className="navbar-link modern-nav-item" onClick={closeMenu}>
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
                        <Link to="/search?category=free&type=python" onClick={closeMenu}>
                          🐍 Python
                        </Link>
                        <Link to="/search?category=free&type=htmlcss" onClick={closeMenu}>
                          🎨 HTML & CSS
                        </Link>
                      </div>
                    )}
                  </div>
                  <Link to="/search?category=paid" className="navbar-dropdown-item" onClick={closeMenu}>
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
