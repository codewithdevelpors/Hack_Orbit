import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Banner.css';
import { renderStars } from '../../utils/helpers';
import { getBannerFiles } from '../../utils/api';

const Banner = ({ onItemClick }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch banner data from database
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        setLoading(true);
        const data = await getBannerFiles();
        
        // Transform API data to banner format
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
        // Fallback to mock data if API fails
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

  // Auto-slide functionality
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 second intervals

    return () => clearInterval(interval);
  }, [banners.length]);

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1);
  };

  const handleBannerClick = (banner) => {
    if (onItemClick) {
      const itemData = {
        id: banner.id,
        name: banner.fileName,
        type: banner.fileType,
        category: banner.category,
        rating: banner.rating,
        shortDescription: banner.shortDescription,
        imgLink: banner.img,
        uploadingData: banner.uploadingData
      };
      onItemClick(itemData);
    }
    navigate(`/details/${banner.id}`);
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

  return (
    <div className="banner-container">
      <div className="banner-carousel">
        <button className="nav-btn prev-btn" onClick={handlePrev}>
          ‹
        </button>

        <div className="banner-wrapper">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`banner-slide ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleBannerClick(banner)}
              style={{ cursor: 'pointer' }}
            >
              <div className="banner-image">
                <img src={banner.img} alt={banner.fileName} onError={(e) => {
                  e.target.src = '/placeholder-banner.jpg'; // Fallback image
                }} />
              </div>
              <div className="banner-info">
                <h3 className="banner-title">{banner.fileName}</h3>
                <p className="banner-type">{banner.fileType}</p>
                <div className="banner-rating">
                  {renderStars(banner.rating)}
                  <span className="rating-number">({banner.rating})</span>
                </div>
                <p className="banner-upload">{banner.uploadingData}</p>
                <p className="banner-description">{banner.shortDescription}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-btn next-btn" onClick={handleNext}>
          ›
        </button>
      </div>

      <div className="banner-indicators">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;