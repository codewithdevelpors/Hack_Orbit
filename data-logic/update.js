require('../server/node_modules/dotenv').config({ path: require('path').resolve(__dirname, '../server/.env') });
const fs = require('fs');
const path = require('path');
const { updateDatabase, upsertDatabase } = require('./logic');

// Read data from data.json
const dataPath = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Instructions
console.log('Data Update Script');
console.log('==================');
console.log('1. Paste your data into data.json as an array of objects.');
console.log('2. Each object should have: imgUrl, fileName, type, category (free/paid)');
console.log('3. Optional fields: shortDescription, pageDescription, price, rating, ratingsCount');
console.log('4. Run this script to update the database.');
console.log('');

if (data.length === 0) {
  console.log('No data found in data.json. Please add data and run again.');
  process.exit(0);
}

// Choose update mode: 'insert' or 'upsert'
const mode = process.argv[2] || 'upsert'; // Default to upsert

console.log(`Updating database with ${data.length} items using mode: ${mode}`);

(async () => {
  try {
    if (mode === 'insert') {
      await updateDatabase(data);
    } else if (mode === 'upsert') {
      await upsertDatabase(data);
    } else {
      console.error('Invalid mode. Use "insert" or "upsert"');
      process.exit(1);
    }
    console.log('Database update completed successfully!');
  } catch (error) {
    console.error('Failed to update database:', error);
    process.exit(1);
  }
})();