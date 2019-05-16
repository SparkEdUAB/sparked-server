import mongoose from 'mongoose'

export const UnitSchema = mongoose.Schema({
  name: String,
  code: String,
  details: {
    courseId: {
      type: String,
      require: false,
    },
  },
  createdAt: Date,
  createdBy: String,
})

const Unit = mongoose.model('Units', UnitSchema)
export { Unit }
