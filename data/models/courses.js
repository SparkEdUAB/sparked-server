let mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  name: String,
  code: String,
  details: {
    schoolId: {
      type: String,
      require: false
    },
    programId: {
      type: String,
      require: false
    },
    language: String
  },
  createdAt: Date,
  createdBy: String
});

const Course = mongoose.model("Courses", CourseSchema);
export { Course };
