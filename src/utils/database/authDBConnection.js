const logger = require('../logger/logger');
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URL
const {MONGO_USERNAME, MONGO_PASSWORD, MONGO_URL, MONGO_CONN_OPTIONS, MONGO_AUTH_DBNAME} = process.env
const mongoAuthConnStr = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_AUTH_DBNAME}?${MONGO_CONN_OPTIONS}`;

// Function to connect to the database and return the connected client
async function connectAuthDB() {
    try {
      mongoose.connect(mongoAuthConnStr);

      mongoose.connection.on('error', error => logger.error("Error connecting to Authentication Database", error) );
      mongoose.Promise = global.Promise;
      
      logger.info(`Connected to Authentication Database`);

    } catch (error) {
      logger.error("Error connecting to Authentication Database", error);
      // throw error;
    }
  }
  
  module.exports = connectAuthDB;