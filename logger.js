const winston = require('winston')
// todo: how to be a global variable?
const logger = winston.createLogger({
  level: 'http',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service'},
  transports: [
    new winston.transports.File({ dirname: 'log', filename: 'error.log', level: 'error' }),
    new winston.transports.File({ dirname: 'log', filename: 'combined.log' }),
    new winston.transports.File({ dirname: 'log', filename: 'http.log', level: 'http' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger