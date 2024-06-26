const express = require('express');
const router = express.Router();
const studentRegistrationController = require("../controller/studentController");


// Create a new student 
router.post('/students', studentRegistrationController.registerStudent);

// Get all students
router.get('/students', studentRegistrationController.getAllStudents);

// Get a single student by ID
router.get('/students/:email', studentRegistrationController.getStudentById);

// Update a student by ID
// router.patch('/students/:id', studentRegistrationController.updateStudentById);

// Delete a student by ID
router.delete('/students/:id', studentRegistrationController.deleteStudentById);

module.exports = router;
