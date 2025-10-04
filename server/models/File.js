// Import Mongoose for MongoDB schema definition
const mongoose = require("mongoose");

// Define the schema for File documents in the database
const fileSchema = new mongoose.Schema({
  imgUrl: { type: String, required: true }, // URL of the file's image
  fileName: { type: String, required: true }, // Name of the file
  type: { type: String, required: true }, // Type of the file (e.g., python, html&css)
  shortDescription: { type: String }, // Brief description for listings
  pageDescription: { type: String }, // Detailed description for full page
  createdDate: { type: Date, default: Date.now }, // Date when the file was created
  category: { type: String, enum: ["free", "paid"], required: true }, // Category: free or paid
  price: { type: Number, default: 0 }, // Price if paid
  rating: { type: Number, default: 0 }, // Average rating
  ratingsCount: { type: Number, default: 0 }, // Number of ratings
  rawFileLink: { type: String }, // Raw file link
  directDownloadLink: { type: String } // Direct download link
});

// Export the model
module.exports = mongoose.model("File", fileSchema);
