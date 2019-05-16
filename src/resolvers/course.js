import { AuthenticationError } from 'apollo-server-express'
import { Course } from '../models/courses'
import { Unit } from '../models/unit'

const resolvers = {
  Query: {
    getCourses(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError('you must be logged in')
      }
      return Course.find({})
    },
  },
  Course: {
    // funny thing, you have access to the whole course
    units: course => {
      return Unit.find({ courseId: course._id })
    },
  },
  Mutation: {
    addCourse(root, args, context) {
      let course = new Course()
      course.name = args.name
      course.createdAt = args.createdAt
      course.createdBy = args.createdBy
      return course.save()
    },
    deleteCourse(root, args) {
      return Course.deleteOne({ _id: args.id })
    },
    updateCourse(root, args) {
      let _tempCource = Object.assign({}, args)
      delete _tempCource.id
      return Course.updateOne({ _id: args.id }, { $set: _tempCource })
    },
  },
}

export default resolvers
