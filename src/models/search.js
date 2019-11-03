import mongoose from 'mongoose'

const searchSchema = mongoose.Schema({
  unitId: {
    type: String,
    optional: true,
  },
  resourceId: {
    type: String,
    optional: true,
  },
  topicId: {
    type: String,
    optional: true,
  },
  courseId: {
    type: String,
    optional: true,
  },
  name: String,
  category: String,
  createdAt: Date,
})

export const Search = mongoose.model('Search', searchSchema)
