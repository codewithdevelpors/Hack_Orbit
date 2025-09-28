// Import the File model
const File = require("../models/File");

// Controller to get files with pagination (14 per page)
const getFiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = 14; // Number of files per page
    const skip = (page - 1) * limit; // Number of files to skip

    const files = await File.find().skip(skip).limit(limit); // Fetch files from DB
    res.json(files); // Return files as JSON
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch files" }); // Error response
  }
};

// Controller to search files by name, type, or category
const searchFiles = async (req, res) => {
  try {
    const query = req.query.query; // Search query from request
    const files = await File.find({
      $or: [
        { fileName: new RegExp(query, "i") }, // Case-insensitive search in fileName
        { type: new RegExp(query, "i") }, // Case-insensitive search in type
        { category: new RegExp(query, "i") }, // Case-insensitive search in category
      ],
    });
    if (files.length === 0) {
      return res.status(404).json({ message: "No data found" }); // No results found
    }
    res.json(files); // Return search results
  } catch (error) {
    res.status(500).json({ message: "Search failed" }); // Error response
  }
};

// Controller to get details of a specific file by ID
const getFileDetails = async (req, res) => {
  try {
    const file = await File.findById(req.params.id); // Find file by ID
    if (!file) return res.status(404).json({ message: "File not found" }); // File not found
    res.json(file); // Return file details
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch details" }); // Error response
  }
};

// Controller to rate a file
const rateFile = async (req, res) => {
  try {
    const { rating } = req.body; // Rating value from request body
    const file = await File.findById(req.params.id); // Find file by ID
    if (!file) return res.status(404).json({ message: "File not found" }); // File not found

    // Update rating as average of all ratings
    const newCount = file.ratingsCount + 1; // Increment rating count
    file.rating = ((file.rating * file.ratingsCount) + rating) / newCount; // Calculate new average
    file.ratingsCount = newCount; // Update count
    await file.save(); // Save changes to DB
    res.json({ message: "Rating updated", file }); // Success response
  } catch (error) {
    res.status(500).json({ message: "Failed to rate file" }); // Error response
  }
};

// Controller to initiate file download (mock implementation)
const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id); // Find file by ID
    if (!file) return res.status(404).json({ message: "File not found" }); // File not found

    res.json({ message: "Download started", fileUrl: file.imgUrl }); // Return download info
  } catch (error) {
    res.status(500).json({ message: "Download failed" }); // Error response
  }
};

// Export all controller functions
module.exports = { getFiles, searchFiles, getFileDetails, rateFile, downloadFile };
