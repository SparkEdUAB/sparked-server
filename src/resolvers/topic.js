import { Topic } from '../models/topic'
import { Unit } from '../models/unit'

const topicResolvers = {
  Query: {
    getUnits(root, args, context) {
      return Topic.find({})
    },
  },
  Unit: {
    topics: unit => {
      return Unit.find({ unitId: unit._id })
    },
  },
  Mutation: {
    addTopic(root, args, { user }) {
      const topic = new Topic()
      topic.name = args.name
      topic.unit = args.unit
      topic.createdAt = new Date()
      topic.createdBy = user._id
      return topic.save()
    },
  },
}

export default topicResolvers
