import mongoose from 'mongoose'

export const UnitSchema = mongoose.Schema({
  name: String,
  code: String,
  courseId: String,
  createdAt: Date,
  createdBy: String,
  createdByName: String,
})

const Unit = mongoose.model('Units', UnitSchema)
export { Unit }
