const Joi = require('joi')
const mongoose = require('mongoose')

const { userSchema } = require('./user')

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['count', 'duration'],
    trim: true,
    default: 'count'
  },
  recordable: {
    type: Boolean,
    default: false
  },
  createdTime: {
    type: Date,
    default: new Date()
  },
  user: {
    type: new mongoose.Schema({
      // todo: add user to commit and habit
      _id: mongoose.Types.ObjectId
    }),
    required: true
  }
})

const Habit = mongoose.model('Habit', habitSchema)

function validate(habit) {
  const schema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().trim().valid('count', 'duration'),
    recordable: Joi.boolean()
  })

  return schema.validate(habit)
}

exports.habitSchema = habitSchema
exports.Habit = Habit
exports.validate = validate