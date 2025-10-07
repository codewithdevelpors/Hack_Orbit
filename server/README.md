# HackOrbit - Backend

A Node.js/Express backend for the HackOrbit website, providing API endpoints for file management, search, ratings, and downloads.

## Features

- **File Management**: CRUD operations for code files with pagination
- **Search**: Full-text search across file names, types, and categories
- **Rating System**: Users can rate files, with average rating calculation
- **Download**: File download endpoints
- **Health Check**: Server and database status monitoring
- **MongoDB Integration**: Persistent data storage
- **Environment Configuration**: Secure configuration with .env files

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv for environment variables
- CORS for cross-origin requests
- Morgan for HTTP logging

## Environment Variables

Create a `.env` file in the server directory:

```
PORT=8000
MONGO_URI=mongodb+srv://codewithdevelpors:Qaimpur828@develpors-hub.zuflo2i.mongodb.net/?retryWrites=true&w=majority&appName=Develpors-hub
APP_NAME=CodeGalaxy
```

## Installation

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

The server will run on [http://localhost:8000/developers](http://localhost:8000/developers).

## API Endpoints

All endpoints are prefixed with `/developers`:

### Files
- `GET /developers/files?page={page}&limit=14` - Get paginated files (14 per page)
- `GET /developers/details/{id}` - Get details of a specific file

### Search
- `GET /developers/search?query={query}` - Search files by name, type, or category

### Rating
- `POST /developers/rate/{id}` - Rate a file (body: { rating: number })

### Download
- `GET /developers/download/{id}` - Initiate file download

### Health
- `GET /developers/health` - Check server and database status

## Database Schema

### File Model
```javascript
{
  _id: ObjectId, // Auto-generated
  imgUrl: String, // Required - URL of the file's preview image
  fileName: String, // Required - Name of the file
  type: String, // Required (e.g., python, html&css)
  shortDescription: String, // Brief description for listings
  pageDescription: String, // Detailed description for full page
  createdDate: Date, // Default: Date.now
  category: String, // Required: "free" or "paid"
  price: Number, // Default: 0
  rating: Number, // Default: 0 (average rating)
  ratingsCount: Number, // Default: 0 (number of ratings)
  rawFileLink: String, // Raw file link
  directDownloadLink: String // Direct download link
}
```

## Data Fetching and Usage

The server fetches the following fields from MongoDB for all queries (except rating updates):

- `_id`: Unique identifier
- `imgUrl`: Used in frontend for displaying file preview images
- `fileName`: Displayed as file title in listings and details
- `type`: Shows file type/category in UI
- `shortDescription`: Used in file cards on home page
- `pageDescription`: Used on details page for full description
- `category`: Determines if file is free/paid, affects UI styling
- `price`: Displayed for paid files
- `rating`: Shows average user rating
- `createdDate`: Displayed as creation date
- `directDownloadLink`: Used for file downloads
- `rawFileLink`: Raw file access link

### Where Data is Used in Frontend:

- **Home Page (`/src/pages/Home/Home.js`)**: Displays file cards with imgUrl, fileName, type, shortDescription, category, price, rating, createdDate
- **Details Page (`/src/pages/Details/Details.js`)**: Shows full file details including pageDescription, and imgUrl for preview
- **Download Page (`/src/pages/Download/Download.js`)**: Uses imgUrl for preview image, fileName for download filename, directDownloadLink for download URL
- **Search Results**: Same fields as home page listings
- **Banner (`/src/components/Banner/Banner.js`)**: Uses imgUrl for banner images, fileName, etc.

## Project Structure

```
server/
├── config/
│   └── db.js          # MongoDB connection
├── controllers/
│   └── fileController.js  # Business logic for file operations
├── models/
│   └── File.js        # Mongoose schema
├── routes/
│   └── fileRoutes.js  # API routes
├── .env               # Environment variables
├── server.js          # Main server file
└── README.md          # This file
```

## Key Components

### server.js
- Main entry point
- Middleware setup (CORS, JSON parsing, logging)
- Route mounting
- Server startup

### config/db.js
- MongoDB connection using Mongoose
- Error handling (server continues running if DB fails)

### models/File.js
- Mongoose schema definition
- Fields for file metadata, ratings, etc.

### controllers/fileController.js
- getFiles: Paginated file retrieval
- searchFiles: Regex-based search
- getFileDetails: Single file details
- rateFile: Rating update with average calculation
- downloadFile: Download initiation

### routes/fileRoutes.js
- Express router setup
- Route definitions

## Rating System

When a user rates a file:
1. Retrieve current rating and count
2. Calculate new average: ((currentRating * count) + newRating) / (count + 1)
3. Update rating and increment count
4. Save to database

## Search Functionality

Searches across:
- fileName (case-insensitive)
- type (case-insensitive)
- category (case-insensitive)

Returns all matching files or 404 if none found.

## Error Handling

- 404 for not found resources
- 500 for server errors
- Graceful DB connection failure handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test API endpoints
5. Submit a pull request

## License

This project is licensed under the MIT License.