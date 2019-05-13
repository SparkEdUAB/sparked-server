import { Course } from "../models/courses";

const resolvers = {
  Query: {
    allCourses(root, args, { user }) {
      return Course.find({});
    }
  },
  Mutation: {
    addCourse(root, args, context) {
      let course = new Course();
      course.name = args.name;
      course.createdAt = args.createdAt;
      course.createdBy = args.createdBy;
      console.log(context);
      return course.save();
    },
    deleteCourse(root, args) {
      return Course.deleteOne({ _id: args.id });
    },
    updateCourse(root, args) {
      let _tempCource = Object.assign({}, args);
      delete _tempCource.id;
      return Course.updateOne({ _id: args.id }, { $set: _tempCource });
    }
  }
};

export default resolvers;
