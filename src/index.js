import express from 'express'
import mongoose from 'mongoose'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// resolvers
import courseResolvers from './resolvers/course'
import unitResolvers from './resolvers/unit'
import userResolvers from './resolvers/user'

// typedefs
import courseTypeDefs from './typdefs/course'
import unitTypeDefs from './typdefs/unit'
import userTypeDefs from './typdefs/user'
import { Course } from './models/courses'

dotenv.config()

mongoose.Promise = global.Promise

// Build a storage for storing users
console.log(
  `mongodb://${process.env.USER}:${
    process.env.PASS
  }@ds157276.mlab.com:57276/sparked`
)

mongoose.connect(
  // !process.env.TEST_DB
  // ?
  `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${
    process.env.TEST_DB
  }`,
  //   :
  // `mongodb://${process.env.USER}:${
  //   process.env.PASS
  // }@ds157276.mlab.com:57276/sparked`,
  { useNewUrlParser: true }
)

const graphQLServer = express()

const typeDefs = mergeTypes([courseTypeDefs, unitTypeDefs, userTypeDefs])

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const _user = req.user
    return {
      user: _user,
      SECRET: process.env.SECRET,
    }
  },
})

const authUser = async req => {
  const token = await req.headers['authorization']

  try {
    const { user } = await jwt.verify(token, process.env.SECRET)
    req.user = user
    req.isAuth = true
    console.log(user)
  } catch (error) {
    console.log(error)
  }
  req.next()
}
graphQLServer.use(authUser)
server.applyMiddleware({ app: graphQLServer, path: '/graphiql' })

// rest api instead
// you can define other endpoints here
graphQLServer.get('/courses', (req, res, next) => {
  Course.find({}).exec((_err, _res) => res.json(_res))
})

graphQLServer.listen(process.env.GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${
      process.env.GRAPHQL_PORT
    }/graphiql`
  )
)
