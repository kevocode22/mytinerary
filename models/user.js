const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true},
  lastName: { type: String},
  photoUser: { type: String },
  email: { type: String, required: true },
  password: [{ type: String, required: true }],
  from: { type: Array, required: true },
  country: { type: String},
  uniqueString:{ type: String, required:true},
  verification: { type: Boolean, required:true}
})

const User = mongoose.model('users', userSchema)
module.exports = User
