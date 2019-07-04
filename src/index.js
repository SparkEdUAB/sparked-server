/* eslint-disable */
import express from 'express'
import mongoose from 'mongoose'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// resolvers
import resolvers from './resolvers'

// typedefs
import typeDefs from './typdefs'

import { Course } from './models/courses'

dotenv.config()

mongoose.Promise = global.Promise

// Build a storage for storing users

// todo: check the current environment and run a specific db
mongoose.connect(
  `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env
    .TEST_DB || 'sparked'}`,
  { useNewUrlParser: true }
)

const graphQLServer = express()

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
  } catch (error) {
    req.isAuth = false
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

const port = process.env.NODE_ENV === 'production' ? 80 : 3000
graphQLServer.listen(port, () =>
  console.log(`GraphiQL is now running on http://localhost:${port}/graphiql`)
)
