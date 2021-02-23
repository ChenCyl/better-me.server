const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const { func } = require('joi')

const userSchema = new mongoose.Schema({
  account: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024
  },
  isVip: {
    type: Boolean,
    default: false
  }
})

userSchema.methods.genJwt = function() {
  return jwt.sign({
    _id: this._id,
    account: this.account,
    isVip: this.isVip
  // todo: privateKey
  }, 'privateKey')
}

const User = mongoose.model('User', userSchema)

const validate = (user) => {
  const schema = Joi.object({
    account: Joi.string().min(1).max(20).required(),
    password: Joi.string().min(6).max(50).required(),
    isVip: Joi.boolean()
  })
  return schema.validate(user)
}

exports.userSchema = userSchema
exports.validate = validate
exports.User = User