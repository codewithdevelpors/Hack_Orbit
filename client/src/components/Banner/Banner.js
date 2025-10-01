import React, { useState, useEffect } from "react";
import { getBannerFiles } from "../../utils/api";
import "./Banner.css";

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        setLoading(true);
        const data = await getBannerFiles();
        const transformedBanners = data.map((file, index) => ({
          id: file._id || file.id || `banner-${index}`,
          img: file.imgUrl || `/banner${index + 1}.jpg`,
          fileName: file.fileName || file.name || `Featured Program ${index + 1}`,
          fileType: file.type || 'Program',
          rating: file.rating || 4.5,
          shortDescription: file.shortDescription || file.description || 'Amazing program from our collection.',
          category: file.category || 'featured',
          uploadingData: index === 0 ? 'Featured Today' : index === 1 ? 'Trending Now' : 'Most Popular'
        }));
        setBanners(transformedBanners);
      } catch (error) {
        console.error('Failed to fetch banner data:', error);
        // Fallback to placeholder data
        const mockBanners = [
          {
            id: '1',
            img: '/banner1.jpg',
            fileName: 'Advanced React Patterns',
            fileType: 'JavaScript',
            rating: 4.8,
            shortDescription: 'Master advanced React concepts and patterns for building scalable applications.',
            category: 'react',
            uploadingData: 'Featured Today'
          },
          {
            id: '2',
            img: '/banner2.jpg',
            fileName: 'Python Data Science Toolkit',
            fileType: 'Python',
            rating: 4.9,
            shortDescription: 'Complete toolkit for data analysis, visualization, and machine learning with Python.',
            category: 'python',
            uploadingData: 'Trending Now'
          },
          {
            id: '3',
            img: '/banner3.jpg',
            fileName: 'Modern CSS Grid & Flexbox',
            fileType: 'CSS',
            rating: 4.7,
            shortDescription: 'Learn modern CSS layout techniques with practical examples and projects.',
            category: 'css',
            uploadingData: 'Most Popular'
          }
        ];
        setBanners(mockBanners);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  const filteredBanners = selectedCategory ? banners.filter(b => b.category === selectedCategory) : banners;

  useEffect(() => {
    if (filteredBanners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === filteredBanners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredBanners.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? filteredBanners.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === filteredBanners.length - 1 ? 0 : currentIndex + 1);
  };

  if (loading) {
    return (
      <div className="banner-container">
        <div className="banner-loading">
          <div className="loading-spinner">Loading featured content...</div>
        </div>
      </div>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];

  return (
    <div className="banner-container">
      <div className="banner">
        <button className="nav-btn prev-btn" onClick={handlePrev}>
          ‹
        </button>

        <div className="banner-slide">
          <div className="banner-image">
            <img src={currentBanner.img} alt={currentBanner.fileName} onError={(e) => {
              e.target.src = '/placeholder-banner.jpg';
            }} />
          </div>
          <div className="banner-info">
            <h3 className="banner-title">{currentBanner.fileName}</h3>
            <p className="banner-type">{currentBanner.fileType}</p>
            <p className="banner-upload">{currentBanner.uploadingData}</p>
            <p className="banner-description">{currentBanner.shortDescription}</p>
          </div>
        </div>

        <button className="nav-btn next-btn" onClick={handleNext}>
          ›
        </button>
      </div>
    </div>
  );
}

export default Banner;
