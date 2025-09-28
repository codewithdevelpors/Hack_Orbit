import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showFreeSub, setShowFreeSub] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className={`navbar ${darkMode ? "dark" : ""}`}>
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src="/logo.fav" alt="Code Galaxy Logo" />
          Code Galaxy
        </Link>
        <Link to="/">Home</Link>
        <div
          className="dropdown"
          onMouseEnter={() => setShowCategories(true)}
          onMouseLeave={() => {
            setShowCategories(false);
            setShowFreeSub(false);
          }}
        >
          <button className="dropbtn">Categories</button>
          {showCategories && (
            <div className="dropdown-content">
              <div
                className="dropdown-sub"
                onMouseEnter={() => setShowFreeSub(true)}
                onMouseLeave={() => setShowFreeSub(false)}
              >
                <span>Free ▸</span>
                {showFreeSub && (
                  <div className="sub-menu">
                    <Link to="/search?category=free&type=python">Python</Link>
                    <Link to="/search?category=free&type=htmlcss">HTML & CSS</Link>
                  </div>
                )}
              </div>
              <Link to="/search?category=paid">Paid</Link>
            </div>
          )}
        </div>
        <Link to="/about">About Us</Link>
      </div>

      <div className="navbar-right">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>
        <button onClick={toggleDarkMode}>{darkMode ? "🌙" : "☀️"}</button>
      </div>
    </nav>
  );
}

export default Navbar;
