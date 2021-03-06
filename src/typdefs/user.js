import { gql } from 'apollo-server-express'

const userDefs = gql`
  type Query {
    allUsers: [User]
    getUser: User
    me: User
  }
  type Mutation {
    register(
      email: String!
      password: String!
      name: String!
      gender: String
      role: String
    ): User!
    login(email: String!, password: String!): String!
    deleteUser(ids: [String]!): User
  }
  type User {
    _id: String
    name: String
    gender: String
    role: String
    status: Boolean
    email: String
    username: String
    password: String
    createdAt: String
  }
`

export default userDefs
