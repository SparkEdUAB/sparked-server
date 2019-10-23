import mongoose from 'mongoose'

const resourceSchema = mongoose.Schema({
  unitId: String,
  topicId: String,
  name: String,
  unit: String,
  createdAt: Date,
  createdBy: String,
  filename: String,
  path: String,
})

export const Resource = mongoose.model('Resources', resourceSchema)
