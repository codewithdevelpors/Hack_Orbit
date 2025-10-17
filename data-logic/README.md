# Data Update Logic

This folder contains the logic and scripts to update the database with new data.

## Files

- `logic.js`: Contains functions to process data and update the database.
- `data.json`: JSON file where you paste your data as an array of objects.
- `update.js`: Script to run the database update process.

## Usage

1. **Prepare your data**: Edit `data.json` and paste your data as an array of objects. You can use either database field names or the exact display names. Each object should have the following required fields:
   - `imgUrl` or `imgUrl`
   - `fileName` or `fileName`
   - `type` or `fileType`: Type of the file (e.g., python, html&css)
   - `category` or `category`: Either "free" or "paid"

   Optional fields:
   - `shortDescription` or `shortDescription`: Brief description
   - `pageDescription` or `pageDescription`: Detailed description
   - `price` or `price`: Price if paid (default 0)
   - `rating` or `rating`: Average rating (default 0)
   - `ratingsCount` or `ratingsCount`: Number of ratings (default 0)
   - `rawFileLink` or `Raw File Link`: Raw file link
   - `directDownloadLink` or `Direct Download Link`: Direct download link
   - `createdDate` or `createdDate`: Creation date (defaults to now)

2. **Run the update script**:
   - From the root directory, run: `node data-logic/update.js`
   - By default, it uses "upsert" mode (updates existing documents or inserts new ones based on `fileName`).
   - To force insert only (will fail if duplicates exist): `node data-logic/update.js insert`

## Example Data

```json
[
  {
    "imgUrl": "https://example.com/image1.jpg",
    "fileName": "sample-code.py",
    "type": "python",
    "shortDescription": "A sample Python script",
    "pageDescription": "This is a detailed description of the sample Python script.",
    "category": "free",
    "price": 0,
    "rating": 4.5,
    "ratingsCount": 10
  }
]
```

## Functions in logic.js

- `updateDatabase(data)`: Inserts new documents (fails on duplicates).
- `upsertDatabase(data)`: Updates existing or inserts new documents.
- `processData(data)`: Validates and processes the data array.

The script connects to the database using the `MONGO_URI` from the `.env` file in the server directory.