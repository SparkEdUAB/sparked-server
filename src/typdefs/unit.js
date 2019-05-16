import { gql } from 'apollo-server-express'

const unitTypeDefs = gql`
  scalar Date
  type Query {
    getUnits: [Unit]
  }
  type Mutation {
    addUnit(name: String!, createdBy: String, createdAt: Date): Unit
  }
  type Unit {
    _id: String
    name: String
    createdAt: Date
    createdBy: String
  }
`

export default unitTypeDefs
