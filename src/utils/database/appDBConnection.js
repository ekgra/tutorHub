const logger = require('../logger/logger');
const mongodb = require('mongodb');
require('dotenv').config();

// MongoDB connection URL
const {MONGO_USERNAME, MONGO_PASSWORD, MONGO_URL, MONGO_CONN_OPTIONS, MONGO_DBNAME} = process.env
const mongoConnStr = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}/?${MONGO_CONN_OPTIONS}`;

const client = new mongodb.MongoClient(mongoConnStr);

// Function to connect to the database and return the connected client
async function connectDB() {
    try {
      await client.connect();
      const db = client.db(MONGO_DBNAME);
      logger.info(`Connected to MongoDB | DB - ${MONGO_DBNAME}`);
      return db;
    } catch (error) {
      logger.error("Error connecting to Application Database -", error);
    }
  }

  dbConn = connectDB();
  
  module.exports = dbConn;