const jwt = require('jsonwebtoken')
const logger = require('../logger')

module.exports = function (req, res, next) {
  logger.http('New request is coming...')
  logger.info('New request is coming...')
  logger.error('New request is coming...')

  const token = req.header('x-token')
  try {
    const decoded = jwt.verify(token, 'privateKey')
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).send('Invalid token.')
  }
}