const express = require('express')
const bcrypt = require('bcrypt')

const { User, validate } = require('../models/user')

const router = express.Router()

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error)

  const hash = await bcrypt.hash(req.body.password, 10)
  const user = new User({
    account: req.body.account,
    password: hash
  })

  try {
    await user.save()
    res.header('x-token', user.genJwt()).send()
  } catch (error) {
    res.send(error)
  }
})

module.exports = router