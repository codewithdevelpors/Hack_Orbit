import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import SearchPage from "./pages/SearchPage/SearchPage";
import Details from "./pages/Details/Details";
import Preview from "./pages/Preview/Preview";
import Download from "./pages/Download/Download";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/preview/:id" element={<Preview />} />
        <Route path="/download/:id" element={<Download />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
