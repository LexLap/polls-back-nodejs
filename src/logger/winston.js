const winston = require('winston');
 
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'poll-voting' },
  transports: [
    new winston.transports.File({ filename: 'debug.log' })
  ],
});

module.exports = logger

