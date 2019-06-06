import { AuthenticationError } from 'apollo-server-express'
import { Topic } from '../models/topic'

const topicResolvers = {
  Query: {
    getTopics(root, args, context) {
      return Topic.find({})
    },
  },
  // add more mutations here
  Mutation: {
    addTopic(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError('You must be logged in')
      }
      const topic = new Topic()
      topic.name = args.name
      topic.unit = args.unit // supposed to be the name for the unit
      topic.unitId = args.unitId
      topic.createdAt = new Date()
      topic.createdBy = user._id
      return topic.save()
    },

    deleteTopic(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError('You must be logged in')
      }
      // todo before deleting, check if it is found
      return Topic.deleteOne({ _id: args.id })
    },

    // add a mutation for deleting the topic
    updateTopic(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError('You must be logged in')
      }
      // todo before trying to update, check if it is found
      let _tempTopic = Object.assign({}, args)
      delete _tempTopic.id
      return Topic.updateOne({ _id: args.id }, { $set: _tempTopic })
    },
  },
}

export default topicResolvers
