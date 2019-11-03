import { AuthenticationError } from 'apollo-server-express'
import { Topic } from '../models/topic'
import { Resource } from '../models/resource'

const topicResolvers = {
  Query: {
    getTopics(root, args, context) {
      return Topic.find({})
    },
    getTopicsByUnitId(root, args, context) {
      return Topic.find({ unitId: args.unitId })
    },
  },
  Topic: {
    resources: topic => {
      return Resource.find({ topicId: topic.topicId })
    },
  },
  // add more mutations here
  Mutation: {
    addTopic(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError('You must be logged in to add a topic')
      }

      const topic = new Topic()
      topic.name = args.name
      topic.unit = args.unit // supposed to be the name for the unit
      topic.unitId = args.unitId
      topic.courseId = args.courseId
      topic.createdAt = new Date()
      topic.createdBy = user._id
      topic.createdByName = user.name
      return topic.save()
    },

    deleteTopic(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError('You must be logged in to delete a topic')
      }
      // todo before deleting, check if it is found
      return Topic.deleteOne({ _id: args.id })
    },

    // add a mutation for deleting the topic
    updateTopic(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError('You must be logged in to update a topic')
      }
      // todo before trying to update, check if it is found
      let _tempTopic = Object.assign({}, args)
      delete _tempTopic.id
      return Topic.updateOne({ _id: args.id }, { $set: _tempTopic })
    },
  },
}

export default topicResolvers
