const express = require('express')
const bcrypt = require('bcrypt')

const { Habit, validate } = require('../models/habit')
const auth = require('../middleware/auth')
const { route } = require('./login')

const router = express.Router()

router.get('/', auth, async (req, res) => {
  const habits = await Habit.find({ user: req.user._id }).sort('createdAt')
  res.send(habits)
})

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error)

  const habit = new Habit({
    name: req.body.name,
    type: req.body.type,
    recordable: req.body.recordable,
    user: req.user._id
  })

  try {
    await habit.save()
    res.send(habit)
  } catch (error) {
    res.send(error)
  }
})

// modify the name of habit
router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error)

  const habit = await Habit.findByIdAndUpdate(
    req.params.id, 
    { name: req.body.name }, 
    { new: true }
  )
  if (!habit) return res.status(404).send('The given habit is not found.')

  res.send(habit)
})

router.delete('/:id', auth, async (req, res) => {
  const habit = await Habit.findByIdAndRemove(req.params.id)
  if (!habit) return res.status(404).send('The given habit is not found.') 

  res.send(habit)
})

module.exports = router