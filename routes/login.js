const express = require('express')
const bcrypt = require('bcrypt')
const Joi = require('joi')

const { User } = require('../models/user')

const router = express.Router()

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error)

  const user = await User.findOne({ account: req.body.account })
  if (!user) return res.status(404).send('Invalid name or password.')

  const match = await bcrypt.compare(req.body.password, user.password)
  if (!match) return res.status(400).send('Invalid name or password.')

  res.header('x-token', user.genJwt()).send()
})

const validate = (user) => {
  const schema = Joi.object({
    account: Joi.string().min(1).max(20).required(),
    password: Joi.string().min(1).max(50).required()
  })

  return schema.validate(user)
}

module.exports = router