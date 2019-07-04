import { gql } from 'apollo-server-express'

const unitDefs = gql`
  scalar Date
  type Query {
    getUnits: [Unit]
  }
  type Mutation {
    addUnit(
      name: String!
      courseId: String!
      createdBy: String
      createdAt: Date
    ): Unit
    deleteUnit(id: String!): Unit
    updateUnit(id: String, name: String): Unit
  }
  type Unit {
    _id: String
    name: String
    courseId: String
    topics: [Topic]
    createdAt: Date
    createdBy: String
  }
`
export default unitDefs
