# Code Galaxy - Backend

A Node.js/Express backend for the Code Galaxy website, providing API endpoints for file management, search, ratings, and downloads.

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
  imgUrl: String, // Required
  fileName: String, // Required
  type: String, // Required (e.g., python, html&css)
  shortDescription: String,
  pageDescription: String,
  createdDate: Date, // Default: Date.now
  category: String, // Required: "free" or "paid"
  price: Number, // Default: 0
  rating: Number, // Default: 0 (average rating)
  ratingsCount: Number // Default: 0
}
```

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