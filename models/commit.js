const { ref } = require('joi')
const Joi = require('joi')
const mongoose = require('mongoose')

const { habitSchema } = require('./habit')

const commitSchema = new mongoose.Schema({
  habit: new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['count', 'duration'],
      trim: true,
      default: 'count'
    }
  }),
  // todo: best practice?
  user: {
    account: {
      type: String,
      required: true
    }
  },
  count: {
    type: Number,
    required: function () {
      return this.habit.type === 'count'
    }
  },
  durationMinutes: {
    type: Number,
    required: function () {
      return this.habit.type === 'duration'
    }
  },
  description: {
    type: String,
    default: ''
  },
  createdTime: {
    type: Date,
    default: new Date()
  }
})

const Commit = mongoose.model('Commit', commitSchema)

function validate(commit) {
  const schema = Joi.object({
    habitId: Joi.string().required(),
    count: Joi.number(),
    durationMinutes: Joi.number(),
    description: Joi.string()
  })

  return schema.validate(commit)
}

exports.Commit = Commit
exports.validate = validate