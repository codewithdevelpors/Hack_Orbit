const File = require("../models/File");

// Get files (pagination, 14 per page)
const getFiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 14;
    const skip = (page - 1) * limit;

    const files = await File.find().skip(skip).limit(limit);
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch files" });
  }
};

// Search files
const searchFiles = async (req, res) => {
  try {
    const query = req.query.query;
    const files = await File.find({
      $or: [
        { fileName: new RegExp(query, "i") },
        { type: new RegExp(query, "i") },
        { category: new RegExp(query, "i") },
      ],
    });
    if (files.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};

// Get file details
const getFileDetails = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });
    res.json(file);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch details" });
  }
};

// Rate a file
const rateFile = async (req, res) => {
  try {
    const { rating } = req.body;
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    file.rating = (file.rating + rating) / 2; // simple avg update
    await file.save();
    res.json({ message: "Rating updated", file });
  } catch (error) {
    res.status(500).json({ message: "Failed to rate file" });
  }
};

// Download file (mock response)
const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    res.json({ message: "Download started", fileUrl: file.imgUrl });
  } catch (error) {
    res.status(500).json({ message: "Download failed" });
  }
};

module.exports = { getFiles, searchFiles, getFileDetails, rateFile, downloadFile };
