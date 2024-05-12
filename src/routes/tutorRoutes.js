const express = require('express');
const router = express.Router();
const tutorRegistrationController = require("../controller/tutorController");

// ROUTES 

// Create a new tutor
router.post('/tutors', tutorRegistrationController.registerStudent);

// Get all tutors
router.get('/tutors', tutorRegistrationController.getAllStudents);

// Get a single tutor by ID
router.get('/tutors/:id', tutorRegistrationController.getStudentById);

// Update a tutor by ID
router.patch('/tutors/:id', tutorRegistrationController.updateStudentById);

// Delete a tutor by ID
router.delete('/tutors/:id', tutorRegistrationController.deleteStudentById);

module.exports = router;
