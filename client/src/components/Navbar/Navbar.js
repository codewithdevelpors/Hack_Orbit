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
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === THEMES.light ? THEMES.dark : THEMES.light);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">🚀</span>
            <span className="logo-text">Code Galaxy</span>
          </Link>

          <div className="navbar-links">
            <Link to="/" className="navbar-link">Home</Link>

            <div
              className="navbar-dropdown"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => {
                setShowCategories(false);
                setShowFreeSub(false);
              }}
            >
              <button className="navbar-dropdown-btn">Categories</button>
              {showCategories && (
                <div className="navbar-dropdown-menu">
                  <div
                    className="navbar-dropdown-item"
                    onMouseEnter={() => setShowFreeSub(true)}
                    onMouseLeave={() => setShowFreeSub(false)}
                  >
                    <span>Free Programs</span>
                    {showFreeSub && (
                      <div className="navbar-submenu">
                        <Link to="/search?category=free&type=python">Python</Link>
                        <Link to="/search?category=free&type=htmlcss">HTML & CSS</Link>
                      </div>
                    )}
                  </div>
                  <Link to="/search?category=paid" className="navbar-dropdown-item">
                    Paid Programs
                  </Link>
                </div>
              )}
            </div>

            <Link to="/about" className="navbar-link">About</Link>
          </div>
        </div>

        <div className="navbar-right">
          <form onSubmit={handleSearch} className="navbar-search">
            <input
              type="text"
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search-input"
            />
            <Button type="submit" variant="ghost" size="sm">
              🔍
            </Button>
          </form>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="theme-toggle"
          >
            {theme === THEMES.dark ? "☀️" : "🌙"}
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
