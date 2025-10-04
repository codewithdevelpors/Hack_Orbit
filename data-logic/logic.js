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

// Function to process data array
function processData(data) {
  if (!Array.isArray(data)) {
    throw new Error('Data must be an array');
  }
  const processedData = [];
  for (const item of data) {
    try {
      validateDataItem(item);
      // Add default values if not present
      const processedItem = {
        ...item,
        createdDate: item.createdDate || new Date(),
        price: item.price || 0,
        rating: item.rating || 0,
        ratingsCount: item.ratingsCount || 0
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