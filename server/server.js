// Import required modules
const express = require("express"); // Web framework for Node.js
const path = require("path"); // Path module for file paths
const dotenv = require("dotenv"); // Load environment variables
const mongoose = require("mongoose"); // MongoDB ODM
const cors = require("cors"); // Enable CORS
const morgan = require("morgan"); // HTTP request logger

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan("dev")); // Log HTTP requests in development mode

// Serve static files from client/public directory
app.use(express.static(path.join(__dirname, '../client/public')));

// Import and use file routes
const fileRoutes = require("./routes/fileRoutes");
app.use("/developers", fileRoutes); // All file-related routes under /developers

// Connect to MongoDB
const connectDB = require("./config/db");
connectDB();

//for check deployment
app.get('/', (req, res) => {
  res.json({ 
    activeStatus:true,
    error:false,              
  })
});

// Health check endpoint to verify server and DB status
app.get("/developers/health", (req, res) => {
  res.json({ server: "running", db: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
