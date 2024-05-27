const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();
require("dotenv").config();

// SignUp
router.post("/signup", authController.signup);

// LogIn
router.post("/login", authController.login);

module.exports = router;

// router.post(
//     '/signup',
//     passport.authenticate('signup', { session: false }),
//     authController.signup
// );
