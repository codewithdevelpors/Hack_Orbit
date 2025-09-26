const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

// Load .env
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
const fileRoutes = require("./routes/fileRoutes");
app.use("/develpors", fileRoutes);

// MongoDB connection
const connectDB = require("./config/db");
connectDB();

// Health Check
app.get("/develpors/health", (req, res) => {
  res.json({ server: "running", db: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/develpors`));
