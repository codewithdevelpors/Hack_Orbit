/**
 * App Component - Main Application Entry Point
 *
 * This is the root component of the HackOrbit application that sets up:
 * - React Router configuration for client-side routing
 * - Main application layout wrapper
 * - All page route definitions
 * - Global styling imports
 *
 * Architecture:
 * - Single Page Application (SPA) using React Router
 * - Layout wrapper pattern with MainLayout
 * - Nested routing structure
 * - Dynamic route parameters for details and download pages
 *
 * Routes:
 * - "/" - Home page (landing/dashboard)
 * - "/about" - About us information page
 * - "/search" - Search results with query parameters
 * - "/details/:id" - Dynamic file details page
 * - "/download/:id" - Dynamic download page
 * - "/privacy" - Privacy policy page
 * - "/terms" - Terms of service page
 */

// Core React and routing imports
import React from "react";
import { Routes, Route } from "react-router-dom";

// Vercel Analytics import
import { Analytics } from "@vercel/analytics/react";

// Global application styles - loaded first for cascading
import "./styles/global.css";

// Main application layout wrapper
import MainLayout from "./layouts/MainLayout";

// Page components - organized by functionality
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import SearchPage from "./pages/SearchPage/SearchPage";
import Details from "./pages/Details/Details";
import Download from "./pages/Download/Download";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService/TermsOfService";
import Themes from "./pages/Themes/Themes";
import Languages from "./pages/Languages/Languages";

/**
 * Main App component
 *
 * Sets up the entire application structure with routing and layout.
 * All pages are wrapped in MainLayout which provides:
 * - Navigation header
 * - Side advertisements (LeftAd, RightAd)
 * - Footer
 * - Consistent page structure
 *
 * @returns {JSX.Element} The complete application structure
 */
function App() {
  return (
    <MainLayout>
      <Routes>
        {/* Home page - main landing page */}
        <Route path="/" element={<Home />} />

        {/* About page - company/project information */}
        <Route path="/about" element={<About />} />

        {/* Search results page - handles query parameters */}
        <Route path="/search" element={<SearchPage />} />

        {/* Dynamic file details page - :id parameter for specific files */}
        <Route path="/details/:id" element={<Details />} />

        {/* Dynamic download page - :id parameter for file downloads */}
        <Route path="/download/:id" element={<Download />} />

        {/* Themes page - animated theme showcase */}
        <Route path="/themes" element={<Themes />} />

        {/* Languages page - language selection */}
        <Route path="/languages" element={<Languages />} />

        {/* Legal/policy pages */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
      <Analytics />
    </MainLayout>
  );
}

// Export the App component as default export
export default App;
