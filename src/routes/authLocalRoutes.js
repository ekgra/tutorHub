// const express = require('express');
// const passport = require('passport');
// const { ensureAuthenticated } = require('../utils/auth/authLocal');

// const authRoutes = express.Router();

// authRoutes.post('/login',
//   passport.authenticate('local', {
//     successRedirect: '/profile',
//     failureRedirect: '/login',
//     failureFlash: true
//   })
// );

// authRoutes.get('/profile', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send('Welcome to your profile');
//   } else {
//     res.redirect('/login');
//   }
// });

// authRoutes.get('/login', (req, res) => {
//   res.send('Login page');
// });

// authRoutes.get('/protected', ensureAuthenticated, (req, res) => {
//   res.send('This is a protected route');
// });

// module.exports = authRoutes;
