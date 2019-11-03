import mongoose from 'mongoose'

const CourseSchema = mongoose.Schema({
  name: String,
  code: String,
  details: {
    schoolId: {
      type: String,
      require: false,
    },
    programId: {
      type: String,
      require: false,
    },
    language: String,
  },
  createdAt: Date,
  createdBy: String,
  createdByName: String,
})

const Course = mongoose.model('Courses', CourseSchema)
export { Course }
