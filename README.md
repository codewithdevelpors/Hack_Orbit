# HackOrbit

A full-stack web application for sharing and downloading code files. Built with React frontend and Node.js/Express backend with MongoDB.

## Project Overview

HackOrbit is a platform where developers can:
- Browse code files with previews
- Search for specific files or categories
- Download free and paid code resources
- Rate and review files
- View file details and previews

## Features

### Frontend (React)
- Responsive design with dark mode support
- Home page with file placeholders (14 per page, 2 per row)
- Search functionality with dedicated results page
- Category filtering (Free: Python/HTML&CSS, Paid)
- File details, preview, and download pages
- Rating system with popup interface
- Auto-moving banners
- Multiple ad placements
- Logo integration throughout

### Backend (Node.js/Express)
- RESTful API with MongoDB
- File management with pagination
- Full-text search capabilities
- Rating system with average calculations
- Download endpoints
- Health check monitoring
- Environment-based configuration

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv
- CORS
- Morgan

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup
1. Navigate to server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create `.env` file with:
   ```
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   APP_NAME=CodeGalaxy
   ```

4. Start the server:
   ```
   npm start
   ```
   Server runs on http://localhost:8000/developers

### Frontend Setup
1. Navigate to client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create `.env` file with:
   ```
   REACT_APP_API_URL=http://localhost:8000/developers
   REACT_APP_WEBSITE_NAME=HackOrbit
   REACT_APP_DEFAULT_THEME=light
   ```

4. Start the development server:
   ```
   npm start
   ```
   App runs on http://localhost:3000

## API Endpoints

All endpoints prefixed with `/developers`:

- `GET /files?page={page}&limit=14` - Paginated files
- `GET /search?query={query}` - Search files
- `GET /details/{id}` - File details
- `POST /rate/{id}` - Rate file
- `GET /download/{id}` - Download file
- `GET /health` - Health check

## Database Schema

Files collection:
```javascript
{
  imgUrl: String,
  fileName: String,
  type: String,
  shortDescription: String,
  pageDescription: String,
  createdDate: Date,
  category: "free" | "paid",
  price: Number,
  rating: Number,
  ratingsCount: Number
}
```

## Project Structure

```
CodeGalaxy/
├── client/              # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── Pages/
│   │   └── utils/
│   └── README.md
├── server/              # Node.js backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── README.md
├── logo.fav             # Website logo
├── promts.txt           # Requirements document
└── README.md            # This file
```

## Key Features Implementation

- **Pagination**: 14 files per page on home
- **Ads System**: Side, popup, and row ads
- **Search**: Case-insensitive search across multiple fields
- **Rating**: Cumulative average rating system
- **File Types**: Special handling for HTML&CSS with separate previews
- **Banners**: Auto-moving carousel with manual controls
- **Responsive**: Works on desktop and mobile

## Contributing

1. Fork the repository
2. Create feature branches
3. Make changes with proper comments
4. Test both frontend and backend
5. Submit pull requests

## License

MIT License

## URLs

- Frontend: http://localhost:3000
- Backend: http://localhost:8000/developers
- Health Check: http://localhost:8000/developers/health
- Home Page: http://localhost:3000/
- Preview Page: http://localhost:3000/preview/{id}
- Download Page: http://localhost:3000/download/{id}
- Search Page: http://localhost:3000/search