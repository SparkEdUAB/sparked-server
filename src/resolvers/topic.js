import { Topic } from '../models/topic'

const topicResolvers = {
  Query: {
    getTopics(root, args, context) {
      return Topic.find({})
    },
  },

  Mutation: {
    addTopic(root, args, { user }) {
      const topic = new Topic()
      topic.name = args.name
      topic.unit = args.unit // supposed to be the name for the unit
      topic.unitId = args.unitId
      topic.createdAt = new Date()
      topic.createdBy = user._id
      return topic.save()
    },
  },
}

export default topicResolvers
