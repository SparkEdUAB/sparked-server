let mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  name: String
});

const Course = mongoose.model("Courses", CourseSchema);
export { Course };
