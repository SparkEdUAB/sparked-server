import { AuthenticationError } from 'apollo-server-express'
import { Unit } from '../models/unit'

const unitResolvers = {
  Query: {
    getUnits(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError('you must be logged in')
      }
      return Unit.find({ createdBy: user._id })
    },
  },
  Mutation: {
    addUnit(root, args, { user }) {
      let unit = new Unit()
      unit.name = args.name
      unit.courseId = args.courseId
      unit.createdAt = args.createdAt
      unit.createdBy = user._id
      // unit.createdA
      return unit.save()
    },
  },
}

export default unitResolvers
