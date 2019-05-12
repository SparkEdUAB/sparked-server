import { gql } from "apollo-server-express";

const typeDefs = gql`
  # scalar String
  # directive @auth on Query
  type Query {
    allCourses: [Course]
  }
  type Mutation {
    # A mutation to add a new channel to the list of channels
    addCourse(name: String!, createdAt: String, createdBy: String): Course
    deleteCourse(id: String!): Course
    updateCourse(id: String!, name: String): Course
  }
  type Course {
    _id: String
    name: String
    createdAt: String
    createdBy: String
  }
`;

export default typeDefs;
