import { AuthenticationError, PubSub } from 'apollo-server-express'
import { Course } from '../models/courses'
import { Unit } from '../models/unit'
import { Topic } from '../models/topic'

export const pubsub = new PubSub()
const COURSE_ADDED = 'COURSE_ADDED'
const resolvers = {
  Subscription: {
    courseAdded: {
      subscribe: () => pubsub.asyncIterator([COURSE_ADDED]),
    },
  },
  Query: {
    getCourses(root, args, { user }) {
      return Course.find({})
    },
  },
  Course: {
    // funny thing, you have access to the whole course
    units: course => {
      return Unit.find({ courseId: course._id })
    },
    topics: course => {
      return Topic.find({ courseId: course._id })
    },
  },
  Mutation: {
    addCourse(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError('you must be logged in to add a course')
      }

      let course = new Course()
      course.name = args.name
      course.createdAt = new Date()
      course.createdBy = user._id
      pubsub.publish(COURSE_ADDED, { courseAdded: args })
      return course.save()
    },
    deleteCourse(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError(
          'you must be logged in to delete a course'
        )
      }

      return Course.deleteMany({ _id: { $in: args.ids } })

      // return Course.deleteOne({ _id: args.id })
    },
    updateCourse(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError(
          'you must be logged in to update a course'
        )
      }
      let _tempCource = Object.assign({}, args)

      delete _tempCource.id
      return Course.updateOne({ _id: args.id }, { $set: _tempCource })
    },
  },
}

export default resolvers
