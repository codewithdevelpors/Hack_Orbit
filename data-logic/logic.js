const mongoose = require('../server/node_modules/mongoose');
const File = require('../server/models/File');
const connectDB = require('../server/config/db');

// Function to validate data item
function validateDataItem(item) {
  const requiredFields = ['imgUrl', 'fileName', 'type', 'category'];
  for (const field of requiredFields) {
    if (!item[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  if (!['free', 'paid'].includes(item.category)) {
    throw new Error(`Invalid category: ${item.category}`);
  }
  return true;
}

// Function to map input field names to DB field names
function mapFieldNames(item) {
  const fieldMapping = {
    'fileType': 'type',
    'Raw File Link': 'rawFileLink',
    'Direct Download Link': 'directDownloadLink',
    'RawFileLink': 'rawFileLink',
    'DirectDownloadLink': 'directDownloadLink'
  };

  const mappedItem = {};
  for (const [key, value] of Object.entries(item)) {
    const dbKey = fieldMapping[key] || key;
    mappedItem[dbKey] = value;
  }
  return mappedItem;
}

// Function to process data array
function processData(data) {
  if (!Array.isArray(data)) {
    throw new Error('Data must be an array');
  }
  const processedData = [];
  for (const item of data) {
    try {
      const mappedItem = mapFieldNames(item);
      // Normalize category
      if (mappedItem.category) {
        mappedItem.category = mappedItem.category.toLowerCase();
      }
      // Normalize price
      if (typeof mappedItem.price === 'string') {
        const priceMatch = mappedItem.price.match(/\$?(\d+(\.\d+)?)/);
        mappedItem.price = priceMatch ? parseFloat(priceMatch[1]) : 0;
      }
      validateDataItem(mappedItem);
      // Add default values if not present
      const processedItem = {
        ...mappedItem,
        createdDate: mappedItem.createdDate || new Date(),
        price: mappedItem.price || 0,
        rating: mappedItem.rating || 0,
        ratingsCount: mappedItem.ratingsCount || 0,
        rawFileLink: mappedItem.rawFileLink || '',
        directDownloadLink: mappedItem.directDownloadLink || ''
      };
      processedData.push(processedItem);
    } catch (error) {
      console.error(`Error processing item: ${error.message}`);
    }
  }
  return processedData;
}

// Function to update database with processed data
async function updateDatabase(data) {
  try {
    await connectDB();
    const processedData = processData(data);

    // Use bulk insert for efficiency
    const result = await File.insertMany(processedData, { ordered: false });
    console.log(`Successfully inserted ${result.length} documents`);
    return result;
  } catch (error) {
    console.error('Error updating database:', error.message);
    throw error;
  } finally {
    await mongoose.connection.close();
  }
}

// Function to upsert data (update if exists, insert if not)
async function upsertDatabase(data) {
  try {
    await connectDB();
    const processedData = processData(data);

    const bulkOps = processedData.map(item => ({
      updateOne: {
        filter: { fileName: item.fileName }, // Assuming fileName is unique
        update: item,
        upsert: true
      }
    }));

    const result = await File.bulkWrite(bulkOps);
    console.log(`Upserted ${result.upsertedCount} documents, modified ${result.modifiedCount} documents`);
    return result;
  } catch (error) {
    console.error('Error upserting database:', error.message);
    throw error;
  } finally {
    await mongoose.connection.close();
  }
}

module.exports = {
  updateDatabase,
  upsertDatabase,
  processData
};