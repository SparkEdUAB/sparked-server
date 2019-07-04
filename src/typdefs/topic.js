import { gql } from 'apollo-server-express'

const topicDefs = gql`
  scalar Date
  type Query {
    getTopics: [Topic]
  }
  type Mutation {
    addTopic(
      name: String!
      unitId: String!
      courseId: String!
      createdBy: String
      createdAt: Date
    ): Topic
    deleteTopic(id: String!): Topic
    updateTopic(id: String, name: String): Topic
  }
  type Topic {
    _id: String
    name: String
    unitId: String
    resources: [File]
    courseId: String
    createdAt: Date
    createdBy: String
  }
`
export default topicDefs
