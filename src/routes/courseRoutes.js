const express = require('express');
const router = express.Router();
const courseController = require("../controller/courseController");


// Create a new course
router.post('/courses', courseController.addOneCourse);

// Get all courses
router.get('/courses', courseController.getAllCourses);

// Get an course by ID
router.get('/courses/:id', courseController.getCourseById);

// Update an course by ID
router.patch('/courses/:id', courseController.updateCourseById);

// Delete an course by ID
router.delete('/courses/:id', courseController.deleteCourseById);

module.exports = router;
