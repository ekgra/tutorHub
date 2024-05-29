// == Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
// const { passport } = require('./utils/auth/authLocal');
// const session = require('express-session');

const logger = require('./utils/logger/logger');

require('./utils/auth/authLocalJWT');
const connectAuthDB = require('./utils/database/authDBConnection'); 

// const authLocalRoutes = require('./routes/authLocalRoutes');
// const authLocalJWTRoutes = require('./routes/authLocalJWTRoutes');
const authAppRoutes = require('./routes/authAppRoutes');
const studentRoutes = require('./routes/studentRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const courseRoutes = require('./routes/courseRoutes'); 
const authenticateToken = require('./middleware/authValidate');

const { error } = require('winston');

require('dotenv').config()

// == Initialize MiddleWare
// -- Allow Cross Origin Requests
// app.use(cors());  --- Blatantly allowing all cross origin requests

// Specify allowed origins
const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:5173'];

// CORS middleware with origin restriction
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


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
// app.use('/auth', authLocalJWTRoutes);
app.use('/api', authAppRoutes);
app.use('/api', authenticateToken, studentRoutes);
// app.use('/api',  passport.authenticate('jwt', { session: false }), studentRoutes);
// // app.use('/api', offeringRoutes); 
// app.use('/api',  passport.authenticate('jwt', { session: false }), courseRoutes);
// app.use('/api',  passport.authenticate('jwt', { session: false }), tutorRoutes);

app.all('*', (err, req, res, next) => {
  res.status(400);
  // logger.error(error);
  logger.error('Error from upstream', err);
  logger.error(res.statusCode, new Error(`\n${req.originalUrl} - URL not Found. \nAre you using the correct HTTP method?`));
  next();
});

// == Start server
const {PORT} = process.env || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

