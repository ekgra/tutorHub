const logger = require('../utils/logger/logger');
const dbConn = require('../utils/database/appDBConnection'); 
const {ObjectId} = require('mongodb');

// Collection name
const collectionName = 'tutors';

exports.registerTutor = async (req, res) => {
    try {
      console.log(req.user);
      if (req.user.userType !== 'tutor') {
        return res.status(403).json({ message: 'Unauthorized' });
      }  

      if (req.user._id !== req.body._id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }  

      // Grab a database connection from the pool
      const db = await dbConn;
      // Access the collection
      const collection = db.collection(collectionName);
      
      const result = await collection.insertOne(req.body);
      
      res.status(201).send(result); 
      logger.info(res.statusCode);
    } catch (error) {
      logger.error(error);
      res.status(400).send(error);
    }
  }

exports.getAllTutors = async (req, res) => {
    try {
      // Check user role
      if (req.user.userType !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
      }  

      // Grab a database connection from the pool
      const db = await dbConn;
      // Access the collection
      const collection = db.collection(collectionName);
      
      const tutors = await collection.find({}).toArray();
      
      res.send(tutors);
      logger.info(res.statusCode);
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  }

exports.getTutorById = async (req, res) => {
    try {
      // Grab a database connection from the pool
      const db = await dbConn;
      // Access the collection
      const collection = db.collection(collectionName);
      
      const tutor = await collection.findOne({ _id: req.params.id });

      // Check user access permissions
      if (req.user.userType === 'tutor' && tutor._id !== req.user._id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }  
      
      if (!tutor) {
        return res.status(404).send();
      }
      res.send(tutor);
      logger.info(res.statusCode);
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  }

exports.updateTutorById = async (req, res) => {
    try {
      // Grab a database connection from the pool
      const db = await dbConn;
      // Access the collection
      const collection = db.collection(collectionName);

      const tutor = await collection.findOne({ _id: req.params.id });

      // Check user access permissions
      if (req.user.userType === 'tutor' && tutor._id !== req.user._id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }  
      
      const result = await collection.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
      
      
      if (result.modifiedCount === 0) {
        return res.status(404).send();
      }
      res.send({ message: 'Tutor updated successfully' });
      logger.info(res.statusCode);
    } catch (error) {
      logger.error(error);
      res.status(400).send(error);
    }
  }

exports.deleteTutorById = async (req, res) => {
    try {
      // Grab a database connection from the pool
      const db = await dbConn;
      // Access the collection
      const collection = db.collection(collectionName);

      const tutor = await collection.findOne({ _id: req.params.id });

      // Check user access permissions
      if (req.user.userType === 'tutor' && tutor._id !== req.user._id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }  
      
      const result = await collection.deleteOne({ _id: req.params.id });
      
      
      if (result.deletedCount === 0) {
        return res.status(404).send();
      }
      res.send({ message: 'Tutor deleted successfully' });
      logger.info(res.statusCode);
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  }