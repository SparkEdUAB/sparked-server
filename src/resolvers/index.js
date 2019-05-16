import { mergeResolvers } from 'merge-graphql-schemas'
import courseResolvers from './course'
import unitResolvers from './unit'
import userResolvers from './user'

export default mergeResolvers([courseResolvers, unitResolvers, userResolvers])
