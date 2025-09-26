const express = require("express");
const router = express.Router();
const { getFiles, searchFiles, getFileDetails, rateFile, downloadFile } = require("../controllers/fileController");

// Routes
router.get("/files", getFiles);
router.get("/search", searchFiles);
router.get("/details/:id", getFileDetails);
router.post("/rate/:id", rateFile);
router.get("/download/:id", downloadFile);

module.exports = router;
