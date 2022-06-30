const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photoUser: { type: String },
  email: { type: String, required: true },
  password: [{ type: String, required: true }],
  from: { type: Array, required: true },
  country: { type: String, required: true}
})

const User = mongoose.model('users', userSchema)
module.exports = User
