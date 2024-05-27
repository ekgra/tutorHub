// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// // const session = require('express-session');

// const users = [
//   { id: 1, username: 'admin', password: 'pwd' }
// ];

// passport.use(new LocalStrategy(
//     (username, password, done) => {
//       const user = users.find(u => u.username === username);
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (user.password !== password) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   const user = users.find(u => u.id === id);
//   done(null, user);
// });

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   else {
//     res.status(401).send("Unauthorized") 
//   }
// }

// module.exports = { passport, ensureAuthenticated };