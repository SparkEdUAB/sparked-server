import { gql } from 'apollo-server-express'

const resourceDefs = gql`
  scalar Upload
  type Query {
    uploads: [File]
    getFiles: [File]
  }
  type File {
    filename: String
    path: String
    unitId: String
    topicId: String
    unit: String
    createdAt: String
    createdBy: String
  }

  type Mutation {
    singleUpload(file: Upload): File
  }
`
export default resourceDefs
