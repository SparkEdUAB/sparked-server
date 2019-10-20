import { AuthenticationError, ApolloError } from 'apollo-server-express'
import { Unit } from '../models/unit'
import { Topic } from '../models/topic'

const unitResolvers = {
  Query: {
    getUnits(root, args, { user }) {
      return Unit.find({})
    },
    getUnitsByCourseId(root, args, { user }) {
      return Unit.find({ courseId: args.courseId })
    },
  },
  Unit: {
    topics: unit => {
      return Topic.find({ unitId: unit._id })
    },
  },
  Mutation: {
    addUnit(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError('you must be logged in to add a unit')
      }

      let unit = new Unit()
      unit.name = args.name
      unit.courseId = args.courseId
      unit.createdAt = new Date()
      unit.createdBy = user._id
      return unit.save()
    },
    deleteUnit(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError('You must be logged in to delete a unit')
      }
      // todo before deleting, check if it is found

      return Unit.deleteOne({ _id: args.id })
    },

    // add a mutation for deleting the topic
    updateUnit(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError('You must be logged in to update a unit')
      }
      let _tempUnit = Object.assign({}, args)

      isItemFound(Unit, args.id)
        .then(() => {
          return Unit.updateOne({ _id: args.id }, { $set: _tempUnit })
        })
        .catch(err => {
          throw new ApolloError(err.message)
        })
      delete _tempUnit.id
    },
  },
}

export function isItemFound(collection, id) {
  return new Promise((resolve, reject) => {
    collection.findOne({ _id: id }, (err, item) => {
      if (err) {
        reject(err)
      } else {
        resolve(item)
      }
    })
  })
}

export default unitResolvers
