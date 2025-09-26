import axios from "axios";

// Base API setup
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/develpors",
});

// =====================
// Files (Placeholders)
// =====================

// Get files with pagination (14 per page)
export const getFiles = async (page = 1) => {
  const response = await api.get(`/files?page=${page}&limit=14`);
  return response.data;
};

// Get file details by ID
export const getFileDetails = async (id) => {
  const response = await api.get(`/details/${id}`);
  return response.data;
};

// =====================
// Search
// =====================

// Search files in DB (by name, type, category)
export const searchFiles = async (query) => {
  const response = await api.get(`/search?query=${query}`);
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
