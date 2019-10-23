import { mergeResolvers } from 'merge-graphql-schemas'
import courseResolvers from './course'
import unitResolvers from './unit'
import userResolvers from './user'
import topicResolvers from './topic'
import { resourceResolver } from './resource'

export default mergeResolvers([
  courseResolvers,
  unitResolvers,
  topicResolvers,
  userResolvers,
  resourceResolver,
])
