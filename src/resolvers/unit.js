import { AuthenticationError } from 'apollo-server-express'
import { Unit } from '../models/unit'
import { Topic } from '../models/topic'

const unitResolvers = {
  Query: {
    getUnits(root, args, { user }) {
      return Unit.find({ createdBy: user._id })
    },
  },
  Unit: {
    topics: unit => {
      return Topic.find({ unitId: unit.unitId })
    },
  },
  Mutation: {
    addTopic(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError('you must be logged in')
      }
      let unit = new Unit()
      unit.name = args.name
      unit.courseId = args.courseId
      unit.createdAt = new Date()
      unit.createdBy = user._id
      return unit.save()
    },
  },
}

export default unitResolvers
