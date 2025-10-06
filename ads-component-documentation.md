# Ads Component - Complete Placeholder Structure Documentation

## Overview
The Ads component is a flexible React component that supports multiple ad display formats with placeholder structures. It includes side ads, row ads, and popup ads with comprehensive CSS styling.

## Component Structure

### Main Component (`Ads.js`)
- **File**: `client/src/components/Ads/Ads.js`
- **Props**: 
  - `type`: Defines ad display type ('side', 'row', 'popup', 'popup-top-right')
  - `onClose`: Callback function for closing ads
- **State**: 
  - `isVisible`: Controls ad visibility
- **Features**:
  - Auto-hide popup ads after 10 seconds
  - Manual close functionality
  - Conditional rendering based on type

### Placeholder Structure

#### 1. Ad Content Container (`ad-content`)
```html
<div className="ad-content">
  <div className="ad-placeholder">
    <div className="ad-icon">📢</div>
    <div className="ad-text">
      <h4>Advertisement</h4>
      <p>Your ad content here</p>
    </div>
  </div>
</div>
```

**Purpose**: Main container for ad content with standardized placeholder layout.

#### 2. Ad Placeholder (`ad-placeholder`)
- **Layout**: Flexbox column layout
- **Alignment**: Centered content
- **Content**: Icon + text structure
- **Styling**: White text with opacity effects

#### 3. Ad Icon (`ad-icon`)
- **Size**: 48px font-size (36px on mobile)
- **Content**: Emoji or icon placeholder (📢)
- **Opacity**: 0.9 for subtle appearance

#### 4. Ad Text (`ad-text`)
- **Structure**: Title (h4) + Description (p)
- **Typography**: 20px title, 16px description
- **Responsive**: Scales down on mobile devices

## Ad Types & CSS Classes

### 1. Side Ads (`ads-side`)
```css
.ads-side {
  width: 150px;
  height: 600px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 100px;
}
```

**Features**:
- Fixed sidebar positioning
- Sticky behavior for viewport following
- Gradient background (blue to purple)
- Shadow for depth effect
- Responsive sizing (250px → 200px on mobile)

**Use Case**: Persistent sidebar advertisements

### 2. Row Ads (`ads-row`)
```css
.ads-row {
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 8px;
  margin: 20px 0;
}
```

**Features**:
- Full-width horizontal layout
- Pink gradient background
- Moderate height (120px → 80px on mobile)
- Vertical margins for spacing

**Use Case**: Banner ads between content sections

### 3. Popup Ads (`ads-popup`)
```css
.ads-popup-overlay {
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 1000;
}

.ads-popup {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: popupSlideIn 0.3s ease-out;
}
```

**Features**:
- Full-screen overlay with backdrop blur
- Centered modal positioning
- Slide-in animation
- White background (different from other ad types)
- Close button with hover effects

**Use Case**: Attention-grabbing promotional content

### 4. Top-Right Popup (`ads-popup-overlay.top-right`)
```css
.ads-popup-overlay.top-right {
  background: none;
  backdrop-filter: none;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 20px;
}
```

**Features**:
- No overlay background
- Positioned at top-right corner
- Less intrusive than center popup
- Same popup styling as center variant

**Use Case**: Notification-style ads

## CSS Class Breakdown

### Layout Classes
- `.ads-side` - Vertical sidebar container
- `.ads-row` - Horizontal banner container
- `.ads-popup-overlay` - Full-screen overlay
- `.ads-popup` - Modal content container
- `.ad-content` - Inner content wrapper
- `.ad-placeholder` - Placeholder layout container

### Content Classes
- `.ad-icon` - Icon/emoji display
- `.ad-text` - Text content wrapper
- `.ad-text h4` - Advertisement title
- `.ad-text p` - Advertisement description

### Interactive Classes
- `.ads-close-btn` - Close button styling
- `.ads-close-btn:hover` - Close button hover state

### Modifier Classes
- `.top-right` - Top-right positioning modifier

## Responsive Design

### Breakpoints
1. **Desktop** (>768px): Full sizes
2. **Tablet** (≤768px): Reduced dimensions
3. **Mobile** (≤480px): Minimum sizes

### Responsive Features
```css
@media (max-width: 768px) {
  .ads-side { width: 250px; height: 500px; }
  .ads-row { height: 100px; }
}

@media (max-width: 480px) {
  .ads-side { width: 200px; height: 400px; }
  .ads-row { height: 80px; }
  .ad-icon { font-size: 36px; }
  .ad-text h4 { font-size: 18px; }
  .ad-text p { font-size: 14px; }
}
```

## Animation Effects

### Popup Animation
```css
@keyframes popupSlideIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
```

**Effect**: Smooth scale and slide animation for popup appearance

### Button Interactions
- Close button hover: `transform: scale(1.1)`
- Color transition on hover: `background: #ff3742`

## Usage Examples

### Basic Implementation
```jsx
import Ads from './components/Ads/Ads';

// Side ad
<Ads type="side" />

// Row ad
<Ads type="row" />

// Center popup
<Ads type="popup" onClose={() => console.log('Ad closed')} />

// Top-right popup
<Ads type="popup-top-right" onClose={() => console.log('Ad closed')} />
```

### Integration Patterns
1. **Sidebar Layout**: Place `<Ads type="side" />` in main layout sidebar
2. **Content Breaks**: Insert `<Ads type="row" />` between content sections
3. **Page Load**: Trigger `<Ads type="popup" />` on component mount
4. **User Actions**: Show `<Ads type="popup-top-right" />` after specific interactions

## Customization Options

### Background Gradients
- **Side Ads**: Blue to purple (`#667eea` → `#764ba2`)
- **Row Ads**: Pink to red (`#f093fb` → `#f5576c`)
- **Popups**: White background for content contrast

### Dimensions
- **Side**: 150px × 600px (sticky positioned)
- **Row**: 100% × 120px (full width)
- **Popup**: Max 500px width, 80vh max height

### Typography
- **Title**: 20px, font-weight 600
- **Description**: 16px, opacity 0.9
- **Icon**: 48px emoji/symbol

## Technical Features

### State Management
- `useState` for visibility control
- `useEffect` for auto-hide timers
- Event handlers for manual close

### Performance Optimizations
- Conditional rendering (returns null when hidden)
- CSS transitions for smooth interactions
- Sticky positioning for efficient scrolling

### Accessibility
- High contrast colors
- Clear close button indicators
- Keyboard-accessible close functionality
- Semantic HTML structure

This documentation provides a complete reference for implementing, customizing, and maintaining the ads component placeholder structure with full CSS specifications.