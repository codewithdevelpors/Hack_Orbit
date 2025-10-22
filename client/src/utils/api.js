import axios from "axios";

// Base API setup
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/developers",
});

// =====================
// Files (Placeholders)
// =====================

// Get files with pagination (14 per page)
export const getFiles = async (page = 1, language = 'en') => {
  const response = await api.get(`/files?page=${page}&limit=14&lang=${language}`);
  return response.data;
};

// Get file details by ID
export const getFileDetails = async (id, language = 'en') => {
  const response = await api.get(`/details/${id}?lang=${language}`);
  return response.data;
};

// =====================
// Search
// =====================

// Search files in DB (by name, type, category, with optional filters)
export const searchFiles = async ({ query, category, type, language = 'en' } = {}) => {
  const params = new URLSearchParams();
  if (query) params.append('query', query);
  if (category) params.append('category', category);
  if (type) params.append('type', type);
  params.append('lang', language);
  const response = await api.get(`/search?${params.toString()}`);
  return response.data;
};

// =====================
// Rating
// =====================

// Rate a file
export const rateFile = async (id, rating) => {
  const response = await api.post(`/rate/${id}`, { rating });
  return response.data;
};

// =====================
// Download
// =====================

// Start download process
export const downloadFile = async (id) => {
  const response = await api.get(`/download/${id}`);
  return response.data;
};

// =====================
// Health Check
// =====================

// Check if server and DB are alive
export const healthCheck = async () => {
  const response = await api.get(`/health`);
  return response.data;
};

// =====================
// Banner
// =====================

// Get featured files for banner display
export const getBannerFiles = async (language = 'en') => {
  try {
    // Try to get featured files, fallback to regular files if no specific endpoint
    const response = await api.get(`/files?featured=true&limit=3&lang=${language}`);
    return response.data;
  } catch (error) {
    // Fallback to getting first 3 files if featured endpoint doesn't exist
    const response = await api.get(`/files?page=1&limit=3&lang=${language}`);
    return response.data;
  }
};
