import { mergeResolvers } from 'merge-graphql-schemas'
import courseResolvers from './course'
import unitResolvers from './unit'
import userResolvers from './user'
import topicResolvers from './topic'

export default mergeResolvers([
  courseResolvers,
  unitResolvers,
  topicResolvers,
  userResolvers,
])
