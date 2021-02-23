const { ref } = require('joi')
const Joi = require('joi')
const mongoose = require('mongoose')

const { habitSchema } = require('./habit')

const commitSchema = new mongoose.Schema({
  habit: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Habit',
    required: true,
    immutable: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: '',
    immutable: true
  },
  count: {
    type: Number,
    // required: function () {
    //   return this.habit.type === 'count'
    // }
  },
  durationMinutes: {
    type: Number,
    // required: function () {
    //   return this.habit.type === 'duration'
    // }
  },
  description: {
    type: String,
    default: ''
  }
}, { timestamps: true })

const Commit = mongoose.model('Commit', commitSchema)

function validateWhenCreating(commit) {
  // todo: perfect this
  const schema = Joi.object({
    habitId: Joi.string().required(),
    count: Joi.number(),
    durationMinutes: Joi.number(),
    description: Joi.string()
  })
  return schema.validate(commit)
}

function validateWhenUpdating(commit) {
  const schema = Joi.object({
    count: Joi.number(),
    durationMinutes: Joi.number(),
    description: Joi.string()
  })

  return schema.validate(commit)
}

exports.Commit = Commit
exports.validateWhenCreating = validateWhenCreating
exports.validateWhenUpdating = validateWhenUpdating