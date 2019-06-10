import mongoose from 'mongoose'

const topicSchema = mongoose.Schema({
  unitId: String,
  courseId: String,
  name: String,
  unit: String,
  //   resources: Array, // removed this for now
  createdAt: Date,
  createdBy: String,
})

export const Topic = mongoose.model('Topics', topicSchema)
