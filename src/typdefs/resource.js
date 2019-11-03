import { gql } from 'apollo-server-express'

const resourceDefs = gql`
  scalar Upload
  type Query {
    uploads: [File]
    getFiles: [File]
    getResourcesByTopicId(topicId: String): [File]
    getResource(id: String!): File
  }
  type File {
    _id: String
    filename: String
    path: String
    unitId: String
    topicId: String
    unit: String
    type: String
    createdAt: String
    createdBy: String
    createdByName: String
  }

  type Mutation {
    # singleUpload(file: Upload, topicId: String): File
    multipleUpload(files: [Upload], topicId: String): [File]
    deleteResources(ids: [String]): File
  }
`
export default resourceDefs
