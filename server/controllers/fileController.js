// Import the File model
const File = require("../models/File");

// Simple translation function (in production, use a proper translation service)
const translateText = (text, targetLang) => {
  if (!text || targetLang === 'en') return text;

  // Basic translation mappings for common terms
  const translations = {
    'Python': {
      'es': 'Python',
      'fr': 'Python',
      'de': 'Python',
      'zh': 'Python',
      'hi': 'पायथन',
      'ar': 'بايثون',
      'pt': 'Python',
      'ru': 'Python',
      'ja': 'Python',
      'ko': 'Python',
      'it': 'Python',
      'tr': 'Python',
      'pl': 'Python',
      'nl': 'Python',
      'sv': 'Python',
      'da': 'Python',
      'no': 'Python',
      'fi': 'Python',
      'he': 'Python'
    },
    'HTML & CSS': {
      'es': 'HTML y CSS',
      'fr': 'HTML et CSS',
      'de': 'HTML & CSS',
      'zh': 'HTML & CSS',
      'hi': 'HTML और CSS',
      'ar': 'HTML و CSS',
      'pt': 'HTML e CSS',
      'ru': 'HTML и CSS',
      'ja': 'HTML & CSS',
      'ko': 'HTML & CSS',
      'it': 'HTML e CSS',
      'tr': 'HTML ve CSS',
      'pl': 'HTML i CSS',
      'nl': 'HTML & CSS',
      'sv': 'HTML & CSS',
      'da': 'HTML & CSS',
      'no': 'HTML & CSS',
      'fi': 'HTML ja CSS',
      'he': 'HTML & CSS'
    }
  };

  // For now, return the original text with a note that it's translated
  // In production, integrate with Google Translate API or similar
  return text + ` (${targetLang.toUpperCase()})`;
};

// Controller to get files with pagination (14 per page)
const getFiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = 14; // Number of files per page
    const skip = (page - 1) * limit; // Number of files to skip
    const lang = req.query.lang || 'en'; // Language parameter

    const files = await File.find().select('_id imgUrl fileName type shortDescription pageDescription category price rating createdDate directDownloadLink rawFileLink').skip(skip).limit(limit); // Fetch files from DB

    // Translate file data based on language
    const translatedFiles = files.map(file => {
      const translatedFile = file.toObject();
      if (lang !== 'en') {
        // Apply translations for non-English languages
        translatedFile.fileName = translateText(translatedFile.fileName, lang);
        translatedFile.shortDescription = translateText(translatedFile.shortDescription, lang);
        translatedFile.pageDescription = translateText(translatedFile.pageDescription, lang);
        translatedFile.type = translateText(translatedFile.type, lang);
      }
      return translatedFile;
    });

    res.json(translatedFiles); // Return translated files as JSON
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch files" }); // Error response
  }
};

// Controller to search files by name, type, or category, with optional filters
const searchFiles = async (req, res) => {
  try {
    const { query, category, type, lang = 'en' } = req.query; // Extract query params
    let filter = {};

    // Add exact filters for category and type if provided
    if (category) {
      filter.category = category;
    }
    if (type) {
      filter.type = type;
    }

    // Add text search if query is provided
    if (query) {
      filter.$or = [
        { fileName: new RegExp(query, "i") }, // Case-insensitive search in fileName
        { type: new RegExp(query, "i") }, // Case-insensitive search in type
        { category: new RegExp(query, "i") }, // Case-insensitive search in category
      ];
    }

    const files = await File.find(filter).select('_id imgUrl fileName type shortDescription pageDescription category price rating createdDate directDownloadLink rawFileLink');
    if (files.length === 0) {
      return res.status(404).json({ message: "No data found" }); // No results found
    }

    // Translate file data based on language
    const translatedFiles = files.map(file => {
      const translatedFile = file.toObject();
      if (lang !== 'en') {
        // Apply translations for non-English languages
        translatedFile.fileName = translateText(translatedFile.fileName, lang);
        translatedFile.shortDescription = translateText(translatedFile.shortDescription, lang);
        translatedFile.pageDescription = translateText(translatedFile.pageDescription, lang);
        translatedFile.type = translateText(translatedFile.type, lang);
      }
      return translatedFile;
    });

    res.json(translatedFiles); // Return translated search results
  } catch (error) {
    res.status(500).json({ message: "Search failed" }); // Error response
  }
};

// Controller to get details of a specific file by ID
const getFileDetails = async (req, res) => {
  try {
    const lang = req.query.lang || 'en'; // Language parameter
    const file = await File.findById(req.params.id).select('_id imgUrl fileName type shortDescription pageDescription category price rating createdDate directDownloadLink rawFileLink'); // Find file by ID
    if (!file) return res.status(404).json({ message: "File not found" }); // File not found

    // Translate file data based on language
    const translatedFile = file.toObject();
    if (lang !== 'en') {
      // Apply translations for non-English languages
      translatedFile.fileName = translateText(translatedFile.fileName, lang);
      translatedFile.shortDescription = translateText(translatedFile.shortDescription, lang);
      translatedFile.pageDescription = translateText(translatedFile.pageDescription, lang);
      translatedFile.type = translateText(translatedFile.type, lang);
    }

    res.json(translatedFile); // Return translated file details
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch details" }); // Error response
  }
};

// Controller to rate a file
const rateFile = async (req, res) => {
  try {
    const { rating } = req.body; // Rating value from request body
    const file = await File.findById(req.params.id).select('rating ratingsCount'); // Find file by ID
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
    const file = await File.findById(req.params.id).select('_id imgUrl fileName type shortDescription pageDescription category price rating createdDate directDownloadLink rawFileLink'); // Find file by ID
    if (!file) return res.status(404).json({ message: "File not found" }); // File not found

    res.json({ message: "Download started", fileUrl: file.directDownloadLink }); // Return download info
  } catch (error) {
    res.status(500).json({ message: "Download failed" }); // Error response
  }
};

// Export all controller functions
module.exports = { getFiles, searchFiles, getFileDetails, rateFile, downloadFile };
