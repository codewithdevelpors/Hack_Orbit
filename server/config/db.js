// Import Mongoose for database connection
const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Use new URL parser
      useUnifiedTopology: true, // Use new server discovery and monitoring engine
    });
    console.log("MongoDB Connected ✅"); // Success message
  } catch (error) {
    console.error("MongoDB connection error ❌", error.message); // Error message
    // Keep server running even if DB connection fails
  }
};

// Export the connection function
module.exports = connectDB;
