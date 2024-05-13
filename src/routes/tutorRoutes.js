const express = require('express');
const router = express.Router();
const tutorRegistrationController = require("../controller/tutorController");

// ROUTES 

// Create a new tutor
router.post('/tutors', tutorRegistrationController.registerTutor);

// Get all tutors
router.get('/tutors', tutorRegistrationController.getAllTutors);

// Get a single tutor by ID
router.get('/tutors/:id', tutorRegistrationController.getTutorById);

// Update a tutor by ID
router.patch('/tutors/:id', tutorRegistrationController.updateTutorById);

// Delete a tutor by ID
router.delete('/tutors/:id', tutorRegistrationController.deleteTutorById);

module.exports = router;
