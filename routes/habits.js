const express = require('express')
const bcrypt = require('bcrypt')

const { Habit, validate } = require('../models/habit')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error)

  const habit = new Habit({
    name: req.body.name,
    type: req.body.type,
    recordable: req.body.recordable,
    createdTime: new Date(),
    user: {
      account: req.user.account,
      isVip: req.user.isVip
    }
  })

  try {
    await habit.save()
    res.send(habit)
  } catch (error) {
    res.send(error)
  }
})

module.exports = router