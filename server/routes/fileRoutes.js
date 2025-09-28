// Import Express and create router
const express = require("express");
const router = express.Router();

// Import controller functions
const { getFiles, searchFiles, getFileDetails, rateFile, downloadFile } = require("../controllers/fileController");

// Define routes for file operations
router.get("/files", getFiles); // Get paginated list of files
router.get("/search", searchFiles); // Search files by query
router.get("/details/:id", getFileDetails); // Get details of a specific file
router.post("/rate/:id", rateFile); // Rate a file
router.get("/download/:id", downloadFile); // Download a file

// Export the router
module.exports = router;
