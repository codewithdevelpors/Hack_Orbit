const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const File = require("./models/File");

// Load environment variables
dotenv.config();

// Read web data from JSON file
const webDataPath = path.join(__dirname, "..", "Web-data.json");
const webData = JSON.parse(fs.readFileSync(webDataPath, "utf8"));

// Transform data to match File model schema
const files = webData.map(item => ({
  imgUrl: item["Direct Image Link"],
  fileName: item["File Name"],
  type: "python",
  shortDescription: item["Short Description"],
  pageDescription: item["Full Description"],
  category: "free",
  price: 0,
  rating: 0,
  ratingsCount: 0
}));

// Connect to DB and seed data
const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected ✅");

    // Clear existing data
    await File.deleteMany({});
    console.log("Cleared existing files");

    // Insert web data
    await File.insertMany(files);
    console.log("Sample files inserted successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();