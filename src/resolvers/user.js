import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pick from 'lodash/pick'
import User from '../models/user'

const userResolver = {
  Query: {
    allUsers(root, args, { user }) {
      // to see other users you should be logged in
      if (!user) {
        throw new AuthenticationError('you must be logged in')
      }
      return User.find({})
    },
    getUser(root, args, { user }) {
      return User.findOne({ email: user.email })
    },
    me(root, args, { user }) {
      return user
    },
  },
  Mutation: {
    async register(root, { email, password, name, gender, roles }) {
      let user = new User()
      user.email = email
      user.name = name
      user.gender = gender
      user.roles = roles
      user.password = await bcrypt.hash(password, 12)

      return user.save()
    },
    async login(root, { email, password }, { SECRET }) {
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error('No user found ')
      }
      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) {
        throw new Error('Incorrect password ')
      }
      //   sign in the user
      const token = await jwt.sign(
        {
          user: pick(user, ['_id', 'email']),
        },
        SECRET,
        // this token will last for a year, this should be adjusted accordingly
        { expiresIn: '1y' }
      )
      return token
    },
  },
}

export default userResolver
