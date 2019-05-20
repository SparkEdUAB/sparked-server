import mongoose from 'mongoose'

const resourceSchema = mongoose.Schema({
  unitId: String,
  name: String,
  unit: String,
  createdAt: Date,
  createdBy: String,
})

export const Resource = mongoose.model('Resources', resourceSchema)
