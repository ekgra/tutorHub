const logger = require('../utils/logger/logger');
const dbConn = require('../utils/database/appDBConnection'); 
const {ObjectId} = require('mongodb');

// Collection name
const collectionName = 'students';

exports.registerStudent = async (req, res) => {
    try {
      console.log(req.user);
      if (req.user.userType !== 'student') {
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

exports.getAllStudents = async (req, res) => {
    try {
      // Check user role
      if (req.user.userType !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
      }  

      // Grab a database connection from the pool
      const db = await dbConn;
      // Access the collection
      const collection = db.collection(collectionName);
      
      const students = await collection.find({}).toArray();
      
      res.send(students);
      logger.info(res.statusCode);
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  }

exports.getStudentById = async (req, res) => {
    try {
      // Grab a database connection from the pool
      const db = await dbConn;
      // Access the collection
      const collection = db.collection(collectionName);
      
      const student = await collection.findOne({ _id: req.params.id });

      // Check user access permissions
      if (req.user.userType === 'student' && student._id !== req.user._id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }  
      
      if (!student) {
        return res.status(404).send();
      }
      res.send(student);
      logger.info(res.statusCode);
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  }

exports.updateStudentById = async (req, res) => {
    try {
      // Grab a database connection from the pool
      const db = await dbConn;
      // Access the collection
      const collection = db.collection(collectionName);

      const student = await collection.findOne({ _id: req.params.id });

      // Check user access permissions
      if (req.user.userType === 'student' && student._id !== req.user._id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }  
      
      const result = await collection.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
      
      
      if (result.modifiedCount === 0) {
        return res.status(404).send();
      }
      res.send({ message: 'Student updated successfully' });
      logger.info(res.statusCode);
    } catch (error) {
      logger.error(error);
      res.status(400).send(error);
    }
  }

exports.deleteStudentById = async (req, res) => {
    try {
      // Grab a database connection from the pool
      const db = await dbConn;
      // Access the collection
      const collection = db.collection(collectionName);

      const student = await collection.findOne({ _id: req.params.id });

      // Check user access permissions
      if (req.user.userType === 'student' && student._id !== req.user._id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }  
      
      const result = await collection.deleteOne({ _id: req.params.id });
      
      
      if (result.deletedCount === 0) {
        return res.status(404).send();
      }
      res.send({ message: 'Student deleted successfully' });
      logger.info(res.statusCode);
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  }