const express = require('express')
const bcrypt = require('bcrypt')

const { Commit, validate } = require('../models/commit')
const { Habit } = require('../models/habit')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error)

  const habit = await Habit.findById(req.body.habitId)  
  if (!habit) return res.status(404).send('The given habit is not found.')

  const commit = new Commit({
    habit,
    user: {
      account: req.user.account
    },
    count: req.body.count,
    durationMinutes: req.body.durationMinutes,
    description: req.body.description,
    createdTime: new Date()
  })

  try {
    await commit.save()
    res.send(commit)
  } catch (error) {
    res.send(error)
  }
})

module.exports = router