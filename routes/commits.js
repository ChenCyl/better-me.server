const express = require('express')
const bcrypt = require('bcrypt')

const { Commit, validateWhenUpdating, validateWhenCreating} = require('../models/commit')
const { Habit } = require('../models/habit')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/', auth, async (req, res) => {
  const commits = await Commit.find({ user: req.user._id }).sort('createdAt')
  res.send(commits)
})

router.post('/', auth, async (req, res) => {
  const { error } = validateWhenCreating(req.body)
  if (error) return res.status(400).send(error)

  const habit = await Habit.findById(req.body.habitId)  
  if (!habit) return res.status(404).send('The given habit is not found.')

  const commit = new Commit({
    habit: habit._id,
    user: req.user._id,
    count: req.body.count,
    durationMinutes: req.body.durationMinutes,
    description: req.body.description,
  })

  try {
    await commit.save()
    res.send(commit)
  } catch (error) {
    res.send(error)
  }
})

// modify the count/durationMinutes/description of commit
router.put('/:id', auth, async (req, res) => {
  const { error } = validateWhenUpdating(req.body)
  if (error) return res.status(400).send(error)

  const commit = await Commit.findByIdAndUpdate(
    req.params.id, 
    {
      count: req.body.count,
      durationMinutes: req.body.durationMinutes,
      description: req.body.description
    }, 
    { new: true }
  )
  if (!commit) return res.status(404).send('The given commit is not found.')

  res.send(commit)
})

module.exports = router