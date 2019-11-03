import mongoose from 'mongoose'

const resourceSchema = mongoose.Schema({
  unitId: String,
  topicId: String,
  name: String,
  unit: String,
  createdAt: Date,
  createdBy: String,
  createdByName: String,
  filename: String,
  path: String,
  type: String,
})

export const Resource = mongoose.model('Resources', resourceSchema)
