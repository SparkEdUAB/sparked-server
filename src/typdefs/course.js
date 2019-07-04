import { gql } from 'apollo-server-express'

const courseDefs = gql`
  type Query {
    getCourses: [Course]
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
    units: [Unit]
    topics: [Topic]
    createdAt: String
    createdBy: String
  }
`
export default courseDefs
