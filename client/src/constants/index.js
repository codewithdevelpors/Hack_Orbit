// Application Constants
export const APP_CONFIG = {
  name: 'Code Galaxy',
  description: 'Discover and download amazing Python programs and code snippets',
  version: '1.0.0',
  author: 'CodeWithDevelpors',
  url: process.env.REACT_APP_API_URL || 'http://localhost:8000/developers'
};

// API Endpoints
export const API_ENDPOINTS = {
  files: '/files',
  search: '/search',
  details: '/details',
  download: '/download',
  rate: '/rate',
  health: '/health'
};

// Pagination
export const PAGINATION = {
  defaultPage: 1,
  itemsPerPage: 14,
  maxVisiblePages: 5
};

// File Types
export const FILE_TYPES = {
  python: 'Python',
  javascript: 'JavaScript',
  html: 'HTML & CSS',
  react: 'React',
  nodejs: 'Node.js'
};

// Categories
export const CATEGORIES = {
  free: 'Free',
  paid: 'Paid'
};

// Theme Options
export const THEMES = {
  light: 'light',
  dark: 'dark'
};

// Breakpoints (for JavaScript use)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

// Animation Durations
export const ANIMATIONS = {
  fast: 150,
  normal: 250,
  slow: 350
};

// Local Storage Keys
export const STORAGE_KEYS = {
  theme: 'codegalaxy_theme',
  userPreferences: 'codegalaxy_preferences'
};

// Error Messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  server: 'Server error. Please try again later.',
  notFound: 'Content not found.',
  unauthorized: 'You are not authorized to perform this action.',
  generic: 'Something went wrong. Please try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  download: 'Download started successfully!',
  rating: 'Thank you for your rating!',
  search: 'Search completed.'
};