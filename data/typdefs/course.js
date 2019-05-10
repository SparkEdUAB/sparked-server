import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date
  type Query {
    allCourses: [Course]
  }
  type Mutation {
    # A mutation to add a new channel to the list of channels
    addCourse(name: String!): Course
    deleteCourse(id: String!): Course
    updateCourse(id: String!, name: String): Course
  }
  type Course {
    _id: String
    name: String
    createdAt: Date
    createdBy: String
  }
`;

export default typeDefs;
