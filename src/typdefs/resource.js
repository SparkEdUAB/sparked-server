import { gql } from 'apollo-server-express'

const resourceDefs = gql`
  scalar Upload
  type Query {
    uploads: [File]
  }
  type File {
    filename: String!
    mimetype: String
    topicId: String
  }

  type Mutation {
    singleUpload(file: Upload): File!
  }
`
export default resourceDefs
