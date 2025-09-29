// Import React and routing components
import React from "react";
import { Routes, Route } from "react-router-dom";

// Import global styles
import "./styles/global.css";

// Import layout
import MainLayout from "./layouts/MainLayout";

// Import page components
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import SearchPage from "./pages/SearchPage/SearchPage";
import Details from "./pages/Details/Details";
import Preview from "./pages/Preview/Preview";
import Download from "./pages/Download/Download";

// Main App component
function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/about" element={<About />} /> {/* About page */}
        <Route path="/search" element={<SearchPage />} /> {/* Search results page */}
        <Route path="/details/:id" element={<Details />} /> {/* File details page */}
        <Route path="/preview/:id" element={<Preview />} /> {/* File preview page */}
        <Route path="/download/:id" element={<Download />} /> {/* File download page */}
      </Routes>
    </MainLayout>
  );
}

// Export the App component
export default App;
