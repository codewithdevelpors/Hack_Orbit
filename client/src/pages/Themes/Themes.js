/**
 * Themes Page Component
 *
 * Showcases amazing animated themes that go beyond simple light/dark modes.
 * Features multiple theme options with live previews, smooth animations,
 * and interactive theme switching.
 *
 * Features:
 * - Multiple animated theme options (not just light/dark)
 * - Live preview with smooth transitions
 * - Interactive theme switching
 * - Responsive design
 * - Amazing CSS animations and effects
 */

import React, { useState, useEffect } from "react";
import "./Themes.css";

/**
 * Available theme configurations with their properties
 */
const THEME_OPTIONS = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon glows and futuristic vibes',
    colors: {
      primary: '#00ff41',
      secondary: '#ff0080',
      accent: '#00ffff',
      background: '#0a0a0a',
      surface: '#1a1a1a'
    },
    animation: 'neon-pulse'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm oranges and purples',
    colors: {
      primary: '#ff6b35',
      secondary: '#f7931e',
      accent: '#ffb627',
      background: '#2d1b69',
      surface: '#4a2c7f'
    },
    animation: 'sunset-wave'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Deep blues and calming waves',
    colors: {
      primary: '#0077be',
      secondary: '#00a8cc',
      accent: '#90e0ef',
      background: '#03045e',
      surface: '#023e8a'
    },
    animation: 'ocean-flow'
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Natural greens and earthy tones',
    colors: {
      primary: '#2d5016',
      secondary: '#4a7c59',
      accent: '#81b29a',
      background: '#1b4332',
      surface: '#2d5a3d'
    },
    animation: 'forest-grow'
  },
  {
    id: 'galaxy',
    name: 'Galaxy',
    description: 'Starry night with cosmic colors',
    colors: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      accent: '#06b6d4',
      background: '#0f0f23',
      surface: '#1e1e3f'
    },
    animation: 'galaxy-twinkle'
  },
  {
    id: 'fire',
    name: 'Fire',
    description: 'Burning reds and intense heat',
    colors: {
      primary: '#dc2626',
      secondary: '#ea580c',
      accent: '#f59e0b',
      background: '#7f1d1d',
      surface: '#991b1b'
    },
    animation: 'fire-flicker'
  }
];

/**
 * Main Themes component
 * Displays theme options with live previews and animations
 */
function Themes() {
  const [selectedTheme, setSelectedTheme] = useState(THEME_OPTIONS[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  /**
   * Handle theme selection with animation
   */
  const handleThemeSelect = (theme) => {
    if (theme.id === selectedTheme.id) return;

    setIsAnimating(true);
    setTimeout(() => {
      setSelectedTheme(theme);
      setIsAnimating(false);
    }, 300);
  };

  /**
   * Apply theme colors to CSS variables
   */
  useEffect(() => {
    const root = document.documentElement;
    const colors = selectedTheme.colors;

    root.style.setProperty('--theme-primary', colors.primary);
    root.style.setProperty('--theme-secondary', colors.secondary);
    root.style.setProperty('--theme-accent', colors.accent);
    root.style.setProperty('--theme-background', colors.background);
    root.style.setProperty('--theme-surface', colors.surface);

    // Add theme class to body for additional styling
    document.body.className = `theme-${selectedTheme.id}`;
  }, [selectedTheme]);

  return (
    <div className="themes-page">
      <div className="themes-container">
        {/* Header */}
        <div className="themes-header">
          <h1 className="themes-title">Amazing Themes</h1>
          <p className="themes-subtitle">
            Discover stunning animated themes that bring your experience to life
          </p>
        </div>

        {/* Theme Grid */}
        <div className="themes-grid">
          {THEME_OPTIONS.map((theme) => (
            <div
              key={theme.id}
              className={`theme-card ${selectedTheme.id === theme.id ? 'active' : ''} ${isAnimating ? 'animating' : ''}`}
              onClick={() => handleThemeSelect(theme)}
            >
              <div className="theme-preview">
                <div className={`theme-animation ${theme.animation}`}>
                  <div className="animation-element element-1"></div>
                  <div className="animation-element element-2"></div>
                  <div className="animation-element element-3"></div>
                </div>
                <div className="theme-colors">
                  <div
                    className="color-swatch primary"
                    style={{ backgroundColor: theme.colors.primary }}
                  ></div>
                  <div
                    className="color-swatch secondary"
                    style={{ backgroundColor: theme.colors.secondary }}
                  ></div>
                  <div
                    className="color-swatch accent"
                    style={{ backgroundColor: theme.colors.accent }}
                  ></div>
                </div>
              </div>
              <div className="theme-info">
                <h3 className="theme-name">{theme.name}</h3>
                <p className="theme-description">{theme.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Live Preview Section */}
        <div className="live-preview-section">
          <h2 className="preview-title">Live Preview</h2>
          <div className="preview-container">
            <div className="preview-card">
              <div className="preview-header">
                <div className="preview-avatar"></div>
                <div className="preview-text">
                  <div className="preview-line line-1"></div>
                  <div className="preview-line line-2"></div>
                </div>
              </div>
              <div className="preview-content">
                <div className="preview-button">Amazing Button</div>
                <div className="preview-elements">
                  <div className="preview-element"></div>
                  <div className="preview-element"></div>
                  <div className="preview-element"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2 className="features-title">Theme Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">✨</div>
              <h3>Smooth Animations</h3>
              <p>Every theme comes with beautiful, smooth animations</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎨</div>
              <h3>Custom Colors</h3>
              <p>Carefully crafted color palettes for each theme</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3>Responsive</h3>
              <p>Perfect on all devices and screen sizes</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <h3>Performance</h3>
              <p>Optimized animations that don't slow down your experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Themes;
