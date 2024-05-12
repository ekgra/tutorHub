const winston = require('winston');

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5
};

// Define log level colors
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'cyan',
  debug: 'blue'
};

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info', // Set the default log level to 'info'
  levels: levels, // Set custom log levels
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }), // Include stack traces for errors
    winston.format.prettyPrint(),
    winston.format.printf(({ timestamp, level, message, stack }) => {
        return JSON.stringify({ timestamp, level, message, stack });
        // return JSON.stringify(stack, null, 2);
      })
  ),
  transports: [
    // Log errors to error.log file
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // Log all levels to combined.log file
    new winston.transports.File({ filename: 'combined.log', handleExceptions: true })
  ],
  // Add console transport for logging to the console in development
  // exceptionHandlers: [
  //   new winston.transports.File({ filename: 'combined.log' }) // Log uncaught exceptions to exceptions.log file
  // ]
});

// Add colors for log levels
winston.addColors(colors);

// If not in production, also log to the console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(), // Add colors to console output
      winston.format.simple(), // Log format as simple text
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }), // Include stack traces for errors
      winston.format.printf(({ timestamp, level, message, stack }) => {
        if (stack === undefined) {
          return `${timestamp} ${level}: ${message}`;
        } else {
          return `${timestamp} ${level}: ${message} ${stack}`;
        }
      })
    ),
    // Only enable 'verbose' and 'debug' log levels in non-production environments
    level: 'verbose', // Set the log level for console output
    handleExceptions: true
  }));
}

module.exports = logger;
