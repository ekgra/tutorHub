// == Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
// const { passport } = require('./utils/auth/authLocal');
// const session = require('express-session');

const logger = require('./utils/logger/logger');

require('./utils/auth/authLocalJWT');
const connectAuthDB = require('./utils/database/authDBConnection'); 

// const authLocalRoutes = require('./routes/authLocalRoutes');
const authLocalJWTRoutes = require('./routes/authLocalJWTRoutes');
const studentRoutes = require('./routes/studentRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const courseRoutes = require('./routes/courseRoutes'); 

const { error } = require('winston');

require('dotenv').config()

// == Initialize MiddleWare
// -- HTTP Body Parser Middleware
app.use(bodyParser.json());

// -- Session Middleware 
// const {SESSION_SECRET_KEY} = process.env;
// app.use(session({
//   secret: SESSION_SECRET_KEY,
//   resave: false,
//   saveUninitialized: false
// }));

// // Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

connectAuthDB();

 
// -- Logging Instrumentation middleware to log requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});



// == Routes
// app.use('/', authLocalRoutes);
app.use('/auth', authLocalJWTRoutes);
// app.use('/api', studentRegistrationRoutes);
app.use('/api',  passport.authenticate('jwt', { session: false }), studentRoutes);
// app.use('/api', offeringRoutes); 
app.use('/api',  passport.authenticate('jwt', { session: false }), courseRoutes);
app.use('/api',  passport.authenticate('jwt', { session: false }), tutorRoutes);

app.all('*', (req, res, next) => {
  // res.status(404);
  // logger.error(error);
  logger.error(res.statusCode, new Error(`\n${req.originalUrl} - URL not Found`));
  next();
});

// == Start server
const {PORT} = process.env || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

