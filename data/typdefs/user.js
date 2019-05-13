import { gql } from "apollo-server-express";

const userSchema = gql`
  #   scalar Date
  type Query {
    allUsers: [User]
    getUser: User
  }
  type Mutation {
    register(email: String!, password: String!): User!
    login(email: String!, password: String!): String!
  }
  type User {
    email: String
    username: String
    password: String
    createdAt: String
  }
`;

export default userSchema;
