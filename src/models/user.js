import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  name: String,
  gender: String,
  roles: [String],
  username: String,
  email: String,
  password: String,
  createAt: Date,
  status: Boolean,
})

const User = mongoose.model('User', userSchema)
export default User
