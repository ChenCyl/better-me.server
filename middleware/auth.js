
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('x-token')
  try {
    const decoded = jwt.verify(token, 'privateKey')
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).send('Invalid token.')
  }
}